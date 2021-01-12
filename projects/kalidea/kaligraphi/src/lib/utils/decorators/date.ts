/**
 * transform raw string date as KalDate
 */

export function Date(): ParameterDecorator {
  return (target: object, propertyKey: string | symbol) => {
    console.log(target, propertyKey);
  };
}
