import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { KalDate } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  reverse = false;

  minYear = 1900;

  maxYear = 2100;

  control = new FormControl(new KalDate());

  dateValidatorForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  get themes() {
    return this.reverse ? 'reverse' : '';
  }

  clearValidators(): void {
    this.dateValidatorForm.patchValue({
      minDate: null,
      maxDate: null
    });
  }

  ngOnInit(): void {
    this.dateValidatorForm = this.fb.group({
      minDate: [],
      maxDate: []
    });

    this.dateValidatorForm.valueChanges.subscribe(
      formValues => {
        this.control.clearValidators();

        if (formValues.minDate !== null && formValues.maxDate !== null) {
          this.control.setValidators([minDateValidator(formValues.minDate), maxDateValidator(formValues.maxDate)]);
        } else if (formValues.minDate !== null) {
          this.control.setValidators([minDateValidator(formValues.minDate)]);
        } else if (formValues.minDate !== null) {
          this.control.setValidators([maxDateValidator(formValues.maxDate)]);
        }

        this.control.updateValueAndValidity();
      }
    );
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
