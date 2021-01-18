var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DateTime } from 'luxon';
import { CoerceP } from './src/lib/utils/decorators/coerce';
const t1 = DateTime.fromISO('2018-11-02T12:10');
const t2 = DateTime.fromISO('2018-10-02T13:05');
class Test {
    cast(raw) {
    }
}
__decorate([
    __param(0, CoerceP('date'))
], Test.prototype, "cast", null);
console.log(t1.diff(t2, 'day').toObject(), t1.hasSame(t2, 'day'));
