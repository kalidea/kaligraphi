import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
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
export class KalOptionComponent implements OnInit, Highlightable {

  /**
   * The unique ID of the option
   */
  @Input() id?: any;

  /**
   * Event emitted when the option is selected or deselected
   */
  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();

  /**
   *  Whether or not the option is currently highligh
   */
  isHighligh: boolean;

  /**
   *  Whether or not the option is currently active / selected
   */
  private isActive: boolean;

  constructor(private _element: ElementRef<HTMLElement>, private cd: ChangeDetectorRef) {
  }

  /**
   *  Whether or not the option is currently active / selected
   */
  get active() {
    return this.isActive;
  }

  /**
   * Set active param
   * @param isActive
   */
  set active(isActive: boolean) {
    this.isActive = isActive;
    this.cd.markForCheck();
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
    this.isHighligh = true;
    this.cd.markForCheck();
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    this.isHighligh = false;
    this.cd.markForCheck();
  }

  ngOnInit() {
  }

}
