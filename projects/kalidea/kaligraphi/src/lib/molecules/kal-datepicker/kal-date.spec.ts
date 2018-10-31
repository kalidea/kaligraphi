import { DateTime } from 'luxon';
import { KalDate } from './kal-date';

// config
const dates = [
  {format: 'dd/MM/yyyy', date: '08/09/2018'},
  {format: 'dd/MM/yy', date: '08/09/18'},
  {format: 'dd/M/yy', date: '08/9/18'},
  {format: 'd/MM/yy', date: '8/09/18'},
  {format: 'd/M/yy', date: '8/9/18'},
];

describe('KalDate class', () => {

  it('should parse all type of date', () => {

    const stringDate = '24/09/2018';

    // string format
    expect(new KalDate(stringDate, 'dd/MM/yyyy').toString())
      .toEqual(stringDate, 'should be able to parse string format');

    // luxon format
    const currentDateLuxon = DateTime.fromFormat(stringDate, 'dd/MM/yyyy');
    expect(new KalDate(currentDateLuxon).toString())
      .toEqual(stringDate, 'should be able to parse luxon format');

    // KalDate format
    const kalDate = new KalDate(stringDate, 'dd/MM/yyyy');
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

    // alpha char
    let kalDate = new KalDate('aa', 'dd/MM/yyyy');
    expect(kalDate.valid).toBeFalsy();
    expect(kalDate.toString()).toEqual('');

    // undefined
    kalDate = new KalDate(undefined);
    expect(kalDate.valid).toBeFalsy();
    expect(kalDate.toString()).toEqual('');

    // null
    kalDate = new KalDate(null);
    expect(kalDate.valid).toBeFalsy();
    expect(kalDate.toString()).toEqual('');
  });

  it('should use current date if not provided', () => {
    const currentDate = DateTime.local().toFormat('dd/MM/yyyy');
    const kalDate = new KalDate();
    expect(kalDate.valid).toBeTruthy();
    expect(kalDate.toString()).toEqual(currentDate);
  });

});
