import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';
import { UntypedFormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Coerce } from '../../utils';
import { KalOptionGroupComponent } from './kal-option-group/kal-option-group.component';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'kal-option',
  exportAs: 'kalOption',
  templateUrl: './kal-option.component.html',
  styleUrls: ['./kal-option.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionComponent implements AfterViewInit, Highlightable, OnDestroy {

  /**
   * The value of the option
   */
  @Input() value: any;

  /**
   * label for this option, if not provided get textContent
   */
  @Input() label: string;
  /**
   * Event emitted when the option is selected or deselected
   */
  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();
  /**
   *  Whether or not the option is currently highlighted
   */
  isHighlighted: boolean;
  /**
   *  Form Control on the active property
   */
  formControl: UntypedFormControl = new UntypedFormControl(false);
  /**
   *  Whether or not the option is currently active / selected
   */
  private isActive: boolean;
  /**
   *  Whether or not the option is disabled
   */
  private isDisabled: boolean;
  /**
   * Store subscription
   */
  private optionGroupDisabledSubscription: Subscription;

  private _disabledSubject = new BehaviorSubject(false);

  constructor(private _element: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef,
              @Optional() @Inject(forwardRef(() => KalOptionGroupComponent)) public group: KalOptionGroupComponent) {
  }

  /**
   * should we display a checkbox on this option ?
   */
  private _checkbox = false;

  @Input()
  @Coerce('boolean')
  get checkbox() {
    return this._checkbox;
  }

  set checkbox(value: boolean) {
    this._checkbox = value;
    this.cdr.markForCheck();
  }

  /**
   *  Whether or not the option is disabled
   */
  @Input()
  get disabled(): boolean {
    return this.isDisabled || (this.group?.disabled);
  }

  set disabled(disabled: boolean) {
    this.isDisabled = coerceBooleanProperty(disabled);
    this._disabledSubject.next(this.disabled);
  }

  get disabled$(): Observable<boolean> {
    return this._disabledSubject.asObservable();
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
    this.formControl.setValue(isActive);
    this.cdr.markForCheck();
  }

  /**
   * Get display value of the option
   * @deprecated
   */
  get viewValue(): string {
    return this.getLabel();
  }

  /**
   * Get display label of the option
   */
  get displayLabel(): string {
    return (this.group?.label ? this.group.label + ' > ' : '' ) + this.getLabel();
  }

  /**
   * get label for this option
   */
  getLabel(): string {
    return (this.label || this._element.nativeElement.textContent || '').trim();
  }

  /**
   * Emit the selection change event
   */
  emitSelectionEvent($event?): void {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (!this.disabled) {
      this.selectionChange.emit(this);
    }
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper optionsComponent as active on arrow key events.
   */
  setActiveStyles(): void {
    this.isHighlighted = true;
    this.cdr.markForCheck();
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper optionsComponent as active on arrow key events.
   */
  setInactiveStyles(): void {
    this.isHighlighted = false;
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    if (this.value === undefined) {
      // setting displayLabel as value to have the kalOptionGroupLabel in the value if present (in case options in different groups have the same name)
      this.value = this.displayLabel;
    }

    if (this.group) {
      this.optionGroupDisabledSubscription = this.group.disabled$.pipe(
        tap(() => {
          this._disabledSubject.next(this.disabled);
          this.cdr.markForCheck();
        })
      ).subscribe();
    }
  }

  ngOnDestroy() {
    if (this.optionGroupDisabledSubscription) {
      this.optionGroupDisabledSubscription.unsubscribe();
    }
  }

}
