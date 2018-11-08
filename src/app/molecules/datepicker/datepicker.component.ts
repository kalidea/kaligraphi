import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { KalDate } from '../../../../projects/kalidea/kaligraphi/src/lib/molecules/kal-datepicker/kal-date';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent {

  control = new FormControl(new KalDate('08/11/2018'), [minDateValidator(new KalDate()), maxDateValidator(new KalDate('15/12/2018'))]);

  constructor() {
    this.control.valueChanges.subscribe(value => console.log(value));
  }

}

export function minDateValidator(minDate: KalDate) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {'minDate': true};
    }

    const minDateTime = minDate.getDate();
    const currentDateTime = (control.value as KalDate).getDate();
    const diffBetweenDates = currentDateTime.diff(minDateTime, ['days']).toObject();

    return Math.trunc(diffBetweenDates.days) < 0 ? {'minDate': true} : null;
  };
}

export function maxDateValidator(maxDate: KalDate) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {'maxDate': true};
    }

    const maxDateTime = maxDate.getDate();
    const currentDateTime = (control.value as KalDate).getDate();
    const diffBetweenDates = currentDateTime.diff(maxDateTime, ['days']).toObject();

    return Math.trunc(diffBetweenDates.days) > 0 ? {'maxDate': true} : null;
  };
}
