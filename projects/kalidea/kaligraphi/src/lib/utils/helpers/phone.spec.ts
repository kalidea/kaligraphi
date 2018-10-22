import { formatPhoneNumber } from './phone';

describe('Helper phone', () => {

  it('should format standard number', () => {
    expect(formatPhoneNumber('0383838383')).toEqual('03 83 83 83 83');
  });

  it('should format international number with +', () => {
    expect(formatPhoneNumber('+33383838383')).toEqual('+333 83 83 83 83');
  });

  it('should format international number with 00', () => {
    expect(formatPhoneNumber('0033383838383')).toEqual('00333 83 83 83 83');
  });

});
