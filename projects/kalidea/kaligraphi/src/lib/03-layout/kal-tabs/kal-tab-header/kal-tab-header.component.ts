import { Highlightable } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { KalTabArea } from '../kal-tab-area';

@Component({
  selector: 'kal-tab-header',
  templateUrl: './kal-tab-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabHeaderComponent extends KalTabArea implements AfterViewInit, Highlightable {

  /**
   * The label of the header
   */
  @Input() label = '';

  /**
   * Is a tab highlighted
   */
  highlighted: boolean;
  /**
   * Is the header selected
   */
  private isSelected = false;
  /**
   * Is the header disabled
   */
  private isDisabled = false;

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

  setActiveStyles(): void {
    this.highlighted = true;
    this.cdr.markForCheck();
  }

  setInactiveStyles(): void {
    this.highlighted = false;
    this.cdr.markForCheck();
  }

}
