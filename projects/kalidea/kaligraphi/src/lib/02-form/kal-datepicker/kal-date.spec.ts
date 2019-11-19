import { KalDate } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-date';
import dayjs from 'dayjs';

// config
const dates = [
  {format: 'DD/MM/YYYY', date: '08/09/2018'},
  {format: 'DD/MM/YY', date: '08/09/18'},
  {format: 'DD/M/YY', date: '08/9/18'},
  {format: 'D/MM/YY', date: '8/09/18'},
  {format: 'D/M/YY', date: '8/9/18'},
];

describe('KalDate class', () => {

  it('should parse all types of date', () => {

    const stringDate = '24/09/2018';

    // string format
    expect(new KalDate(stringDate).toString())
      .toEqual(stringDate, 'should be able to parse string format');

    // DayJS format
    const currentDateLuxon = dayjs(stringDate, 'DD/MM/YYYY');
    expect(new KalDate(currentDateLuxon).toString())
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
    ['aa', undefined, ''].forEach(invalidValue => {
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

});
