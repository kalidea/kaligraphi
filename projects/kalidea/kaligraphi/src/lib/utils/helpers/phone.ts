/**
 * Format phone number
 */
export function formatPhoneNumber(phoneNumber: string): string {
  let formatted: string[] = [];

  if (phoneNumber) {
    const value = phoneNumber.replace(/\s/g, '');

    if (value.substring(0, 2) === '00') {
      formatted = formatPhoneNumberWithSpaces(value, (i) => i >= 4 && i % 2 === 1);
    } else if (value.charAt(0) === '+') {
      formatted = formatPhoneNumberWithSpaces(value, (i) => i >= 3 && i % 2 === 0);
    } else {
      formatted = formatPhoneNumberWithSpaces(value, (i) => i % 2 === 0 && i > 0);
    }
  }

  return formatted.join('');
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
