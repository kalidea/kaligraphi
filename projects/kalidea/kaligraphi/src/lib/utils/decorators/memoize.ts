// hack for rollup bug: https://github.com/ng-packagr/ng-packagr/issues/217
import memoize from 'lodash-es/memoize';

export function Memoize(config?: {resolver}) {
  // Vu la complexité du code, il est plus judicieux de garder cette fonction, elle utilise this qui est scopé
  // tslint:disable-next-line:only-arrow-functions
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value;
    const resolver = config && config.resolver ? config.resolver : null;
    const newFunction = resolver ? memoize(oldFunction, resolver) : memoize(oldFunction);
    descriptor.value = function () {
      return newFunction.apply(this, arguments);
    };
  };
}
