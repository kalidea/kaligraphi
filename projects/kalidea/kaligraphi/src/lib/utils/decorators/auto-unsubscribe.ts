/**
 * auto unsubscribe annotation to unsubscribe subscription when component is detroyed
 * how to use :
 *
 ```
 export class DumbComponent implements OnDestroy {

    @AutoUnsubscribe()
    subscription: Subscription;

    ngOnDestroy(): void {
    }
  }
 ```
 */
import { isArray } from 'util';
import { Subscription } from 'rxjs';

export function AutoUnsubscribe() {

  const decoratorSubscriptionsListKey = 'decoratorSubscriptionsListKey';

  return function (target: any, key: string) {

    // does the interface has method ngOnDestroy
    if (!Reflect.has(target, 'ngOnDestroy')) {
      throw new Error(`${target.constructor.name} should implements interface OnDestroy`);
    }

    // init : add property to store subscriptions
    if (!target[decoratorSubscriptionsListKey]) {
      const original = target.constructor.prototype.ngOnDestroy;

      // autoUnsubscribe
      target.constructor.prototype.ngOnDestroy = function () {
        target[decoratorSubscriptionsListKey].forEach((property) => {
          const subscriptions: Subscription[] = isArray(this[property]) ? this[property] : [this[property]];

          subscriptions.forEach(subscription => {
            if (subscription && subscription.unsubscribe) {
              subscription.unsubscribe();
            }
          });

        });

        original.apply(this, arguments);
      };


      Reflect.defineProperty(target, decoratorSubscriptionsListKey, {value: []});
    }

    // add current subscription key
    target[decoratorSubscriptionsListKey].push(key);
  };
}
