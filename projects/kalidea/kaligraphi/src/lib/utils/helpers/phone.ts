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
 * get phone formatter for the given value
 */
function getPhoneFormatter(value): (i: number) => boolean {

  let positionMin = 1;
  let modulo = 0;
  let indexes = [];

  if (value.substring(0, 2) === '00') {
    positionMin = 6;
    modulo = 1;
    indexes = [4, 5];
  } else if (value.charAt(0) === '+') {
    positionMin = 5;
    modulo = 0;
    indexes = [3, 4];
  }

  return (i) => indexes.indexOf(i) >= 0 || (i >= positionMin && i % 2 === modulo);

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
