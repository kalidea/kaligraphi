import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const autoUnsubscribe = (componentInstance) => <T>(source: BehaviorSubject<T>) => {
  const original = componentInstance.ngOnDestroy;

  if (!original) {
      throw new Error(
        `autoUnsubscribe rxjs operator: ngOnDestroy lifecycle hook is required in ${componentInstance.constructor.name}
        order to work in aot build. Please read issue https://github.com/angular/angular/issues/16023')`
      );
  }

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
