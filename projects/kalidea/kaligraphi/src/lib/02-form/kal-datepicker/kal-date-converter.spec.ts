import { formatDate } from './kal-date-converter';

describe('KalDateConverter', () => {

  it('should parse years', () => {
    ['yy', 'yyyy'].forEach(format => {
      expect(formatDate(format)).toEqual(format.toLocaleUpperCase());
    });
  });

  it('should parse months', () => {
    ['M', 'MM', 'MMM', 'MMMM'].forEach(format => {
      expect(formatDate(format)).toEqual(format);
    });
  });

  it('should parse days', () => {
    ['d', 'dd'].forEach(format => {
      expect(formatDate(format)).toEqual(format.toLocaleUpperCase());
    });

    expect(formatDate('EEEEE')).toEqual('d');
    expect(formatDate('EEEEEE')).toEqual('dd');
    expect(formatDate('E')).toEqual('ddd');
    expect(formatDate('EE')).toEqual('ddd');
    expect(formatDate('EEE')).toEqual('ddd');
    expect(formatDate('EEEE')).toEqual('dddd');
  });

  it('should parse hours', () => {
    ['H', 'HH', 'h', 'hh'].forEach(format => {
      expect(formatDate(format)).toEqual(format);
    });
  });

  it('should parse minutes', () => {
    ['m', 'mm'].forEach(format => {
      expect(formatDate(format)).toEqual(format);
    });
  });

  it('should parse seconds', () => {
    ['s', 'ss', 'SSS'].forEach(format => {
      expect(formatDate(format)).toEqual(format);
    });
  });

  it('should parse zones', () => {
    ['Z', 'ZZ', 'ZZZ'].forEach(format => {
      expect(formatDate(format)).toEqual('ZZ');
    });

    expect(formatDate('ZZZZZ')).toEqual('Z');
  });

  it('should parse periods', () => {
    expect(formatDate('aaa')).toEqual('A');

    ['a', 'aa'].forEach(format => {
      expect(formatDate(format)).toEqual('a');
    });
  });

  it('should correctly parse a angular format to a dayjs format', () => {
    expect(formatDate('dd MM yyyy HH:mm:ss')).toEqual('DD MM YYYY HH:mm:ss');
    expect(formatDate('EEEE, MMMM d, yy, h:mm:ss.SSS a ZZZZZ')).toEqual('dddd, MMMM D, YY, h:mm:ss.SSS a Z');
  });

});
