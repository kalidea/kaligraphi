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
   * Is the button labelised ?
   */
  @Input() label: string;

  /**
   * The tab index
   */
  @Input() tabIndex: number;

  /**
   * Is the button disabled ?
   */
  @Input()
  get disabled() {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
    this.tabIndex = this.isDisabled ? this.tabIndex : null;
  }

  private isDisabled = false;


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
