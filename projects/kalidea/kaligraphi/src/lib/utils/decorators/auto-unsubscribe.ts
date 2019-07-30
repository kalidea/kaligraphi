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
import { Subscription } from 'rxjs';

export function AutoUnsubscribe() {

  const decoratorSubscriptionsListKey = 'decoratorSubscriptionsListKey';

  return function (target: any, key: string) {

    // init : add property to store subscriptions
    if (!target[decoratorSubscriptionsListKey]) {
      const original = target.ngOnDestroy;

      // autoUnsubscribe
      target.ngOnDestroy = function () {
        target[decoratorSubscriptionsListKey].forEach((property) => {
          const subscriptions: Subscription[] = Array.isArray(this[property]) ? this[property] : [this[property]];

          subscriptions.forEach(subscription => {
            if (subscription && subscription.unsubscribe) {
              subscription.unsubscribe();
            }
          });

        });

        if (original) {
          original.apply(this, arguments);
        }
      };


      Reflect.defineProperty(target, decoratorSubscriptionsListKey, {value: []});
    }

    // add current subscription key
    target[decoratorSubscriptionsListKey].push(key);
  };
}
