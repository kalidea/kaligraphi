import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { Coerce } from '../../utils/decorators/coerce';

@Component({
  selector: 'kal-button',
  templateUrl: './kal-button.component.html',
  styleUrls: ['./kal-button.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalButtonComponent {

  /**
   * Is the button disabled ?
   */
  private isDisabled = false;

  @ViewChild('button', {static: true}) button: ElementRef<HTMLButtonElement>;

  /**
   * tabindex value
   */
  @Input() tabIndex: number;

  @Input() size: 'normal' | 'large' = 'normal';

  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Input()
  @Coerce('boolean')
  get disabled() {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = value;
    this.tabIndex = this.disabled ? this.tabIndex : null;
  }

}
