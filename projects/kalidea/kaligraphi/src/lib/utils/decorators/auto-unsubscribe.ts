/**
 * auto unsubscribe annotation to unsubscribe subscription when component is detroyed
 * how to use :
 *
 * ```
 * export class DumbComponent implements OnDestroy {
 *
 *    @AutoUnsubscribe()
 *    subscription: Subscription;
 *
 *    ngOnDestroy(): void {
 *    }
 *  }
 * ```
 */
import { Subscription } from 'rxjs';

const decoratorSubscriptionsListKey = 'decoratorSubscriptionsListKey';

export function AutoUnsubscribe() {

  return (componentInstance: any, key: string) => {

    // init : add property to store subscriptions
    if (!componentInstance[decoratorSubscriptionsListKey]) {
      const originialDestroy = componentInstance.ngOnDestroy;

      if (!originialDestroy) {
        throw new Error(
          `autoUnsubscribe rxjs operator: ngOnDestroy lifecycle hook is required in ${componentInstance.constructor.name}
        order to work in aot build. Please read issue https://github.com/angular/angular/issues/16023')`
        );
      }

      // autoUnsubscribe
      componentInstance.ngOnDestroy = destroy(componentInstance, originialDestroy);

      Reflect.defineProperty(componentInstance, decoratorSubscriptionsListKey, {value: []});
    }

    // add current subscription key
    componentInstance[decoratorSubscriptionsListKey].push(key);
  };
}

const destroy = (componentInstance: any, originialDestroy: any) => {
  return function () {
    componentInstance[decoratorSubscriptionsListKey].forEach((property) => {
      const subscriptions: Subscription[] = Array.isArray(this[property]) ? this[property] : [this[property]];

      subscriptions.forEach(subscription => {
        if (subscription && subscription.unsubscribe) {
          subscription.unsubscribe();
        }
      });
    });

    if (originialDestroy) {
      originialDestroy.apply(this, arguments);
    }
  };
};
