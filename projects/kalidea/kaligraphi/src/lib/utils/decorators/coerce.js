/**
 * auto coerce data
 * inspired by https://stackoverflow.com/a/49554548
 */
import { coerceArray, coerceBooleanProperty, coerceCssPixelValue, coerceNumberProperty } from '@angular/cdk/coercion';
import { coerceKalDateProperty } from '../../02-form/kal-datepicker/kal-date';
function coerceFromType(value, type, fallback) {
    switch (type) {
        case 'date':
            return coerceKalDateProperty(value);
        case 'array':
            return coerceArray(value);
        case 'number':
            return coerceNumberProperty(value, fallback);
        case 'boolean':
            return coerceBooleanProperty(value);
        case 'cssPixelValue':
            return coerceCssPixelValue(value);
    }
    return null;
}
export function CoerceP(type) {
    return (target, propertyKey, parameterIndex) => {
        console.log({ target, propertyKey, parameterIndex });
    };
}
export function Coerce(type, fallback) {
    // Vu la complexité du code, il est plus judicieux de garder cette fonction, elle utilise this qui est scopé
    // tslint:disable-next-line:only-arrow-functions
    return function (target, key, propDesc) {
        const privateKey = '_coerce_' + key.toString();
        propDesc = propDesc || {
            configurable: true,
            enumerable: true,
        };
        propDesc.get = propDesc.get || (function () {
            return this[privateKey];
        });
        const originalSetter = propDesc.set || (function (val) {
            this[privateKey] = val;
        });
        propDesc.set = function (val) {
            const oldValue = this[key];
            const newVal = coerceFromType(val, type, fallback);
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
