import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'kal-option',
  templateUrl: './kal-option.component.html',
  styleUrls: ['./kal-option.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionComponent implements Highlightable {

  /**
   * The unique ID of the option
   */
  @Input() value: any;

  /**
   * Event emitted when the option is selected or deselected
   */
  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();

  /**
   *  Whether or not the option is currently highlighted
   */
  isHighlighted: boolean;

  /**
   *  Whether or not the option is currently active / selected
   */
  private isActive: boolean;

  constructor(private _element: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
  }

  /**
   *  Whether or not the option is currently active / selected
   */
  get active() {
    return this.isActive;
  }

  /**
   * Set active param
   */
  set active(isActive: boolean) {
    this.isActive = isActive;
    this.cdr.markForCheck();
  }

  /**
   * Get display value of the option
   */
  get viewValue(): string {
    return (this._element.nativeElement.textContent || '').trim();
  }

  /**
   * Emit the selection change event
   */
  emitSelectionEvent(): void {
    this.selectionChange.emit(this);
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    this.isHighlighted = true;
    this.cdr.markForCheck();
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    this.isHighlighted = false;
    this.cdr.markForCheck();
  }

}
