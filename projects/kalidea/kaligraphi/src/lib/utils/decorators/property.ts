import { get } from 'lodash';

export function Property<T>(property: (keyof T), ...properties: string[]): PropertyDecorator {
  return function(target, key: string, propertyDescriptor?: any) {
    Object.defineProperty(target, key, {
      get() {
        return get(this[property], properties);
      }
    });
  };
}
