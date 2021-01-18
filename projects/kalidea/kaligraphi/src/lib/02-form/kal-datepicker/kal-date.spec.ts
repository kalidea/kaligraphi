import { KalDate } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-date';
import dayjs from 'dayjs';

// config
const dates = [
  {format: 'dd/MM/yyyy', date: '08/09/2018'},
  {format: 'dd/MM/yy', date: '08/09/18'},
  {format: 'dd/M/yy', date: '08/9/18'},
  {format: 'd/MM/yy', date: '8/09/18'},
  {format: 'd/M/yy', date: '8/9/18'},
];

describe('KalDate class', () => {

  it('should parse all types of date', () => {

    const stringDate = '24/09/2018';

    // string format
    expect(new KalDate(stringDate).toString())
      .toEqual(stringDate, 'should be able to parse string format');

    // DayJS format
    const currentDateDayJS = dayjs(stringDate, 'DD/MM/YYYY');
    expect(new KalDate(currentDateDayJS).toString())
      .toEqual(stringDate, 'should be able to parse luxon format');

    // KalDate format
    const kalDate = new KalDate(stringDate);
    expect(new KalDate(kalDate).toString())
      .toEqual(stringDate, 'should be able to parse KalDate format');
  });

  it('should manage formats : ' + Object.keys(dates).join(','), () => {
    let date: KalDate;

    dates.forEach(dateObject => {
      date = new KalDate(dateObject.date, dateObject.format);
      expect(date.valid).toBeTruthy('date should be valid');
      expect(date.toString()).toEqual(dates[0].date);
    });
  });

  it('should manage invalid date', () => {

    // Testing invalid values for parsing : alpha char, undefined, null
    ['aa', undefined, '', '31/02/2020'].forEach(invalidValue => {
      const kalDate = new KalDate(invalidValue);
      expect(kalDate.valid).toBeFalsy();
      expect(kalDate.toString()).toEqual('');
    });

    const currentDate = dayjs().format('DD/MM/YYYY');
    const validKalDate = new KalDate(null);
    expect(validKalDate.valid).toBeTruthy();
    expect(validKalDate.toString()).toEqual(currentDate);

  });

  it('should use current date if not provided', () => {
    const currentDate = dayjs().format('DD/MM/YYYY');
    const kalDate = new KalDate();
    expect(kalDate.valid).toBeTruthy();
    expect(kalDate.toString()).toEqual(currentDate);
  });

  it('should thow an error if there\'s no default parse format provided', () => {
    // https://ajsblackbelt.wordpress.com/2014/05/18/jasmine-tests-expect-tothrow/
    expect(() => new KalDate('18/11/2019', null)).toThrowError('You should provide a date format');
  });

  it('should handle comparison functions', () => {

    // is same
    expect(new KalDate('18/11/2019').isSame('18/11/2019')).toBeTruthy();
    expect(new KalDate('18/11/2019').isSame(new KalDate('08/10/2019'))).toBeFalsy();

    // is before
    expect(new KalDate('18/11/2019').isBefore('19/11/2019')).toBeTruthy();
    expect(new KalDate('18/11/2019').isBefore(new KalDate('01/01/2019'))).toBeFalsy();

    // is after
    expect(new KalDate('18/11/2019').isAfter('17/11/2019')).toBeTruthy();
    expect(new KalDate('18/11/2019').isAfter(new KalDate('31/12/2019'))).toBeFalsy();

    // is same or before
    expect(new KalDate('14/05/2020').isSameOrBefore('16/05/2020')).toBeTruthy();
    expect(new KalDate('14/05/2020').isSameOrBefore('14/05/2020')).toBeTruthy();
    expect(new KalDate('16/05/2020').isSameOrBefore(new KalDate('14/05/2020'))).toBeFalsy();

    // is same or after
    expect(new KalDate('16/05/2020').isSameOrAfter('14/05/2020')).toBeTruthy();
    expect(new KalDate('14/05/2020').isSameOrAfter('14/05/2020')).toBeTruthy();
    expect(new KalDate('14/05/2020').isSameOrAfter(new KalDate('16/05/2020'))).toBeFalsy();

    // is between
    expect(new KalDate('18/11/2019').isBetween('01/11/2019', '31/12/2019')).toBeTruthy();
    expect(new KalDate('18/11/2019').isBetween(new KalDate('19/11/2019'), new KalDate('30/11/2019'))).toBeFalsy();

    // is between with exclusions
    expect(new KalDate('18/11/2019').isBetween('18/11/2019', '19/11/2019', {start: true, end: false})).toBeFalsy();
    expect(new KalDate('19/11/2019').isBetween('18/11/2019', '19/11/2019', {start: false, end: true})).toBeFalsy();

    // is today
    expect(new KalDate().isToday()).toBeTruthy();
    expect(new KalDate('15/11/2019').isToday()).toBeFalsy();
  });

  it('should add local timezone if not provided', () => {
    const rawDate = '2020-03-30T15:15:20.110';
    const date = new KalDate(rawDate, 'yyyy-MM-ddTHH:mm:ss.SSS');
    expect(date.toFormat('yyyy-MM-ddTHH:mm:ss.SSSZZZZZ')).toBe(rawDate + KalDate.getLocalGMTOffset());
  });

  it('should manage timezone and validity', () => {

    const datesList = [
      {raw: '2020-03-05T14:36:48.687Z', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-03-05T14:36:48.687-00:00', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-03-05T14:36:48.687+00:00', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-03-05T14:36:48.687+01:00', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-03-05T14:36:48.687-08:00', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-03-05T14:36:48.687Z', format: 'yyyy-MM-ddTHH:mm:ss.SSS', valid: true},
      {raw: '2020-03-05T14:36:48.687', format: 'yyyy-MM-ddTHH:mm:ss.SSS', valid: true},
      {raw: '2020-03-05T14:36:48.687', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: true},
      {raw: '2020-02-32T14:36:48.687Z', format: 'yyyy-MM-ddTHH:mm:ss.SSSZZZZZ', valid: false},
      {raw: '2020-02-32T14:36:48.687', format: 'yyyy-MM-ddTHH:mm:ss.SSS', valid: false},
    ];

    datesList.forEach(({raw, format, valid}) => {
      const date = new KalDate(raw, format);
      expect(date.valid).toBe(valid, `${raw} validity should be ${valid}`);
    });

  });

});
