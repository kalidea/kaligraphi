import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-tab-header',
  templateUrl: './kal-tab-header.component.html',
  styleUrls: ['./kal-tab-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabHeaderComponent implements OnInit {

  /**
   * The label of the header
   */
  @Input() label = '';

  /**
   * Is the header selected
   */
  private isSelected = false;

  /**
   * Is the header disabled
   */
  private isDisabled = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Is the header disabled
   */
  @Input()
  get disabled() {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = value;
    this.cdr.markForCheck();
  }

  /**
   * Is the header selected
   */
  @Input()
  get selected() {
    return this.isSelected;
  }

  set selected(value: boolean) {
    this.isSelected = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.cdr.markForCheck();
  }

}
