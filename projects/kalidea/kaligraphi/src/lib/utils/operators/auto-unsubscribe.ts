import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const autoUnsubscribe = (componentInstance) => <T>(source: BehaviorSubject<T>) => {
  const original = componentInstance.ngOnDestroy;
  componentInstance['_destroy'] = new Subject();

  componentInstance.ngOnDestroy = function () {
    if (original) {
      original.apply(this, arguments);
    }

    componentInstance['_destroy'].next(true);
    componentInstance['_destroy'].complete();
  };

  return source.pipe(takeUntil(componentInstance['_destroy']));
};
