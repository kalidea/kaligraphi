/**
 * Format phone number
 */

export function formatPhoneNumber(phoneNumber: string): string {
  let explodedPhoneNumber: string[] = [];

  if (phoneNumber) {
    const value = phoneNumber.replace(/\s/g, '');


    explodedPhoneNumber = formatPhoneNumberWithSpaces(value, getPhoneFormatter(value));

  }

  return explodedPhoneNumber.join('');
}

/**
 * helper function to build formatter
 */
function buildFormatterFunction(positionMin, modulo, indexes = []): (i: number) => boolean {
  return (i) => indexes.indexOf(i) >= 0 || (i >= positionMin && i % 2 === modulo);
}

/**
 * get phone formatter for the given value
 */
function getPhoneFormatter(value): (i: number) => boolean {

  if (value.substring(0, 2) === '00') {
    return buildFormatterFunction(6, 1, [4, 5]);
  } else if (value.charAt(0) === '+') {
    return buildFormatterFunction(5, 0, [3, 4]);
  }

  return buildFormatterFunction(1, 0);

}

function formatPhoneNumberWithSpaces(value, includeSpace: (i: number) => boolean): string[] {
  const formatted: string[] = [];
  value.split('').forEach((number, i) => {
    if (includeSpace(i)) {
      formatted.push(' ');
    }
    formatted.push(number);
  });
  return formatted;
}
