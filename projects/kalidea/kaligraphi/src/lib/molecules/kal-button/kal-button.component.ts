import {
  Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output,
  EventEmitter
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';


@Component({
  selector: 'kal-button',
  templateUrl: './kal-button.component.html',
  styleUrls: ['./kal-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalButtonComponent implements OnInit {

  /**
   * tabindex value
   */
  @Input() tabIndex: number;

  @Input() size: 'normal' | 'large' = 'normal';

  /**
   * Output for a event clic
   */
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Is the button disabled ?
   */
  private isDisabled = false;

  constructor() {
  }

  get disabled() {
    return this.isDisabled;
  }

  @Input()
  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
    this.tabIndex = this.disabled ? this.tabIndex : null;
  }

  handleClick(event: any) {
    this.click.emit(event);
  }

  ngOnInit() {
  }

}
