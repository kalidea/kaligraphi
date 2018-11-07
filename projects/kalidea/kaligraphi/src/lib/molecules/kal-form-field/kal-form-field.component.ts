import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kal-form-field',
  templateUrl: './kal-form-field.component.html',
  styleUrls: ['./kal-form-field.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalFormFieldComponent {

  /**
   * Does the field has an error
   */
  hasError = false;

  /**
   * Label of the field
   */
  @Input() label: string;

  /**
   * Is the field required
   */
  @Input() required = false;

  /**
   * For attribute
   */
  @Input() for: string;

}
