/**
 * auto coerce data
 * inspired by https://stackoverflow.com/a/49554548
 */
import { coerceArray, coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { coerceKalDateProperty } from '../../99-utility/kal-date/kal-date';

export type KAL_COERCE_TYPES = 'boolean' | 'number' | 'cssPixelValue' | 'array' | 'date';

function coerceFromType(value: any, type: KAL_COERCE_TYPES, formatOrDefaultNumber) {
  switch (type) {
    case 'date':
      return coerceKalDateProperty(value, formatOrDefaultNumber);
    case 'array':
      return coerceArray(value);
    case 'number':
      return coerceNumberProperty(value, formatOrDefaultNumber);
    case 'boolean':
      return coerceBooleanProperty(value);
    case 'cssPixelValue':
      return coerceCssPixelValue(value);
  }
  return null;
}

export function Coerce(type: KAL_COERCE_TYPES, formatOrDefaultNumber?): PropertyDecorator & MethodDecorator {
  // Vu la complexité du code, il est plus judicieux de garder cette fonction, elle utilise this qui est scopé
  return function (target: any, key: string | symbol, propDesc?: PropertyDescriptor): void | any {
    const privateKey = '_coerce_' + key.toString();

    propDesc = propDesc || {
      configurable: true,
      enumerable: true,
    };
    propDesc.get = propDesc.get || (function (this: any) {
      return this[privateKey];
    });

    const originalSetter = propDesc.set || (function (this: any, val: any) {
      this[privateKey] = val;
    });

    propDesc.set = function (this: any, val: any) {
      const oldValue = this[key];
      const newVal = coerceFromType(val, type, formatOrDefaultNumber);
      if (val !== oldValue) {
        originalSetter.call(this, newVal);
      }
    };

    if (propDesc) {
      return propDesc;
    }

    target[key] = propDesc;

  };
}
