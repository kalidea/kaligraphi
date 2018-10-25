import { formatPhoneNumber } from './phone';

fdescribe('Helper phone', () => {

  it('should format standard number', () => {
    expect(formatPhoneNumber('0383838383')).toEqual('03 83 83 83 83');
  });

  it('should format international number with +', () => {
    expect(formatPhoneNumber('+33383838383')).toEqual('+33 3 83 83 83 83');
  });

  it('should format international number with 00', () => {
    expect(formatPhoneNumber('0033383838383')).toEqual('0033 3 83 83 83 83');
  });

});
