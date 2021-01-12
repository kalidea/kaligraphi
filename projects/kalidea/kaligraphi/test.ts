import {DateTime} from 'luxon';
import {CoerceP } from './src/lib/utils/decorators/coerce';

const t1 = DateTime.fromISO('2018-11-02T12:10');
const t2 = DateTime.fromISO('2018-10-02T13:05');

class Test {
  cast( @CoerceP('date') raw: string) {
  }
}

console.log(t1.diff(t2, 'day').toObject(), t1.hasSame(t2, 'day'));
