// hack for rollup bug: https://github.com/ng-packagr/ng-packagr/issues/217
import memoize from 'lodash-es/memoize';

export function Memoize(config?: {resolver}) {
  return function (target, key, descriptor) {
    const oldFunction = descriptor.value;
    const resolver = config && config.resolver ? config.resolver : null;
    const newFunction = resolver ? memoize(oldFunction, resolver) : memoize(oldFunction);
    descriptor.value = function () {
      return newFunction.apply(this, arguments);
    };
  };
}

