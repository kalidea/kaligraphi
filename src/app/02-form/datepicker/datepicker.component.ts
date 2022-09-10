import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { AutoUnsubscribe, KalDate, kalDefaultDateFormat } from '@kalidea/kaligraphi';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit, OnDestroy {
  reverse = false;

  minYear = 1900;

  maxYear = 2100;

  control = new UntypedFormControl(new KalDate());

  dateValidatorForm: UntypedFormGroup;

  closeOnPick = true;

  openOnClick = true;

  updateDate: string;

  @AutoUnsubscribe()
  private subscription = Subscription.EMPTY;

  constructor(private fb: UntypedFormBuilder) {
  }

  format = kalDefaultDateFormat;

  get themes() {
    return this.reverse ? 'reverse' : '';
  }

  clearValidators(): void {
    this.dateValidatorForm.patchValue({
      minDate: null,
      maxDate: null
    });
  }

  update($event: any) {
    console.log($event);
    this.control.patchValue($event);
  }

  ngOnInit(): void {
    this.dateValidatorForm = this.fb.group({
      minDate: [],
      maxDate: []
    });

    this.subscription = this.dateValidatorForm.valueChanges.subscribe(
      formValues => {
        this.control.clearValidators();

        if (formValues.minDate !== null && formValues.maxDate !== null) {
          this.control.setValidators([minDateValidator(formValues.minDate), maxDateValidator(formValues.maxDate)]);
        } else if (formValues.minDate !== null) {
          this.control.setValidators([minDateValidator(formValues.minDate)]);
        } else if (formValues.maxDate !== null) {
          this.control.setValidators([maxDateValidator(formValues.maxDate)]);
        }

        this.control.updateValueAndValidity();
      }
    );
  }

  ngOnDestroy(): void {
  }

  getFormat() {
    return this.format.split(/([|, ])/);
  }
}

export function minDateValidator(minDate: KalDate) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {'minDate': true};
    }
    const minDateTime = minDate.getDate();
    const currentDateTime = new KalDate(control.value).getDate();
    const diffBetweenDates = currentDateTime.diff(minDateTime, 'day');

    return Math.trunc(diffBetweenDates) < 0 ? {'minDate': true} : null;
  };
}

export function maxDateValidator(maxDate: KalDate) {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return {'maxDate': true};
    }

    const maxDateTime = maxDate.getDate();
    const currentDateTime = (control.value as KalDate).getDate();
    const diffBetweenDates = currentDateTime.diff(maxDateTime, 'day');

    return Math.trunc(diffBetweenDates) > 0 ? {'maxDate': true} : null;
  };
}
