const dateFormats = {
    'yy': 'YY',
    'yyyy': 'YYYY',
    'M': 'M',
    'MM': 'MM',
    'MMM': 'MMM',
    'MMMM': 'MMMM',
    'd': 'D',
    'dd': 'DD',
    'EEEEE': 'd',
    'EEEEEE': 'dd',
    'E': 'ddd',
    'EE': 'ddd',
    'EEE': 'ddd',
    'EEEE': 'dddd',
    'H': 'H',
    'HH': 'HH',
    'h': 'h',
    'hh': 'hh',
    'm': 'm',
    'mm': 'mm',
    's': 's',
    'ss': 'ss',
    'SSS': 'SSS',
    'ZZZZZ': 'Z',
    'Z': 'ZZ',
    'ZZ': 'ZZ',
    'ZZZ': 'ZZ',
    'aaa': 'A',
    'a': 'a',
    'aa': 'a',
};
/**
 * Format a date of angular format to a DayJS format.
 * <b>/!\ SOME FORMATS ARE NOT SUPPORTED BY DAYJS THEREFORE THEY WILL NOT BE PARSED /!\</b>
 * <b>Unsupported formats :</b>
 * <ul>
 *   <li>
 *     Not supported
 *     <ul>
 *       <li>Era</li>
 *       <li>Month standalone</li>
 *       <li>Week of year</li>
 *       <li>Week of month</li>
 *       <li>Period*</li>
 *       <li>Period standalone*</li>
 *     </ul>
 *   </li>
 *   <li>
 *     Partially unsupported
 *     <ul>
 *       <li>
 *          Year
 *          <ul>
 *            <li>y, yyy</li>
 *          </ul>
 *        </li>
 *   <li>
 *     Month
 *     <ul>
 *       <li>MMMMM</li>
 *     </ul>
 *   </li>
 *   <li>
 *     Period
 *     <ul>
 *       <li>aaaa, aaaaa</li>
 *     </ul>
 *   </li>
 *   <li>
 *     Fractional seconds
 *     <ul>
 *       <li>S, SS</li>
 *     </ul>
 *   </li>
 *   <li>
 *     Zone
 *     <ul>
 *       <li>z, zz, zzz, zzzz</li>
 *       <li>ZZZZ</li>
 *       <li>O, OO, OOO, OOOO</li>
 *     </ul>
 *   </li>
 *  </ul>
 * </ul>
 * @param angularFormat A string of custom format options.
 * @see https://angular.io/api/common/DatePipe#custom-format-options
 */
export function formatDate(angularFormat) {
    let dayJsDateFormat = '';
    let countChars = 0;
    // get Z at end of format
    let zList = '';
    if (angularFormat.endsWith('Z')) {
        while (angularFormat.endsWith('Z')) {
            angularFormat = angularFormat.slice(0, -1);
            zList += 'Z';
        }
    }
    const splitResult = angularFormat.split(/\W|_|T/);
    splitResult.forEach((item, i) => {
        // Compute DayJS date format.
        // Item can be an empty string if we have a `space` separator.
        if (item !== '') {
            countChars += item.length;
            dayJsDateFormat += dateFormats[item];
        }
        // Add separator.
        if (i !== splitResult.length - 1) {
            dayJsDateFormat += angularFormat[countChars];
            countChars++;
        }
    });
    if (zList) {
        dayJsDateFormat += dateFormats[zList];
    }
    return dayJsDateFormat;
}
