import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {KAL_FORM_FIELDS_GLOBAL_OPTIONS, KalFormFieldOptions} from '@kalidea/kaligraphi';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: KAL_FORM_FIELDS_GLOBAL_OPTIONS,
      useValue: {
        showError: true,
        showErrorAtDisplay: true,
        errors: {
          'email': 'wrong email',
          'maxlength': '{value} length ({actualLength}) exceed maximal {requiredLength}',
          'minlength': '{value} length ({actualLength}) below minimal {requiredLength}'
        }
      } as KalFormFieldOptions
    }
  ]
})
export class FormFieldComponent {
  control1 = new FormControl('john', [Validators.email, Validators.minLength(4)]);
  control2 = new FormControl('jeanne', [Validators.email, Validators.maxLength(10)]);

  /**
   * Is form element disabled
   */
  disabled = false;
  readonly = false;

  reverse = false;

  legend = 'new legend';

  displayErrors = true;

  newValue = '';

  get themes() {
    return this.reverse ? 'reverse' : '';
  }

  updateValue($event: string) {
    this.control1.setValue($event);
    this.control1.updateValueAndValidity();
  }
}
