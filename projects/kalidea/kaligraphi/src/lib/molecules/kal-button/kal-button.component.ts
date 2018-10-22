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
   * button label
   */
  @Input() label: string;

  /**
   * tabindex value
   */
  @Input() tabIndex: number;

  /**
   * Is the button disabled ?
   */

  private isDisabled = false;

  @Input()
  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
    this.tabIndex = this.isDisabled ? this.tabIndex : null;
  }

  get disabled() {
    return this.isDisabled;
  }

  /**
   * add icon to label button
   */
  @Input() name: string;

  /**
   * Output for a event clic
   */
  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();


  handleClick(event: any) {
    this.clicked.emit(event);
  }

  constructor() {
  }

  ngOnInit() {
  }

}
