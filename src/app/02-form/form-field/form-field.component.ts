import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormFieldComponent {
  control1 = new FormControl('john', Validators.email);

  /**
   * Is form element disabled
   */
  disabled = false;

  reverse = false;

  legend = 'new legend';

  get themes() {
    return this.reverse ? 'reverse' : '';
  }

}
