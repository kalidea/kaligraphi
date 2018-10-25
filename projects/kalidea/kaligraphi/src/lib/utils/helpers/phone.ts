/**
 * Format phone number
 */

enum PhoneFormatter {
  Double0 = '00',
  Plus = '+',
  Default = 'default'
}

export function formatPhoneNumber(phoneNumber: string): string {
  let formatted: string[] = [];

  if (phoneNumber) {
    const value = phoneNumber.replace(/\s/g, '');

    formatted = formatPhoneNumberWithSpaces(value, getPhoneFormatter(value));

  }

  return formatted.join('');
}

function getPhoneFormatter(value): (number) => boolean {

  let formatter = PhoneFormatter.Default;
  if (value.substring(0, 2) === '00') {
    formatter = PhoneFormatter.Double0;
  } else if (value.charAt(0) === '+') {
    formatter = PhoneFormatter.Plus;
  }

  const phoneFormatter = {
    [PhoneFormatter.Double0]: (i) => (i >= 4 && i <= 5) || (i >= 6 && i % 2 === 1),
    [PhoneFormatter.Plus]: (i) => (i >= 3 && i <= 4) || (i >= 5 && i % 2 === 0),
    [PhoneFormatter.Default]: (i) => i > 0 && i % 2 === 0
  };

  return phoneFormatter[formatter];
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
