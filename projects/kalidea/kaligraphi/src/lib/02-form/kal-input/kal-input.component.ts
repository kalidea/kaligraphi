import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  InjectionToken,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { Coerce } from '../../utils/decorators/coerce';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { FormHooks } from '../../utils/forms/form-hooks';

import { InputFormater } from './format/input-formater';
import { KalFormaterService } from './kal-formater.service';

export interface KalInputOptions {

  clearable?: boolean;

}

/** InjectionToken that can be used to specify the global input options. */
export const KAL_INPUT_GLOBAL_OPTIONS =
  new InjectionToken<KalInputOptions>('KAL_INPUT_GLOBAL_OPTIONS');

@Component({
  selector: 'kal-input',
  exportAs: 'kalInput',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent implements OnChanges, OnDestroy, AfterContentInit {

  /**
   * form control for this component
   */
  control: FormControl;

  @Input() autocomplete: string;

  /**
   * should we format data on field on blur ?
   */
  @Input() formatOnBlur = true;

  /**
   * type of input  ( text, password, email, number, ... )
   */
  @Input() type = 'text';

  /**
   * chars limit
   */
  @Input() limit: number;

  /**
   * Custom icon to use for the input
   */
  @Input() icon: string;

  /**
   * if defaultValue is provided , it will replace values : '' / undefined / null
   */
  @Input() defaultValue;

  @Output() readonly iconClicked = new EventEmitter<MouseEvent>();

  /**
   * event to trigger change
   */
  @Input() updateOnEvent: FormHooks = 'change';
  /**
   * Reference to native input
   */
  @ViewChild('input', {static: true}) inputElement: ElementRef<HTMLInputElement>;

  // empty id attribute
  @HostBinding('attr.id')
  attributeId = null;

  // set tabindex to be able to receive focus event (KalAutoFocus)
  @HostBinding('attr.tabindex')
  tabIndex = 0;

  @AutoUnsubscribe()
  private controlValueChangedSubscription = Subscription.EMPTY;
  private _clearable: boolean;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector,
              private formaters: KalFormaterService,
              @Optional() @Inject(KAL_INPUT_GLOBAL_OPTIONS) private inputOptions: KalInputOptions) {
    super();
    this.clearable = this.inputOptions ? this.inputOptions.clearable : false;
  }

  @Input()
  @Coerce('boolean')
  get clearable(): boolean {
    return this._clearable;
  }

  set clearable(value: boolean) {
    this._clearable = value;
  }

  get htmlInputType() {
    switch (this.type) {
      case 'password':
      case 'time':
        return this.type;
      default:
        return 'text';
    }
  }

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return this.formaters.get(this.type);
  }

  get shouldDisplayClearIcon(): boolean {
    return this._clearable && !this.disabled && (this.control && !!this.control.value);
  }

  clearField() {
    if (!this.disabled) {
      this.control.setValue('');
    }
  }

  customIconClicked($event: MouseEvent) {
    this.iconClicked.emit($event);
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {

    // if value is empty, should update value to defaultValue
    if (this.isEmpty(value) && this.defaultValue !== undefined) {
      value = this.defaultValue;
      this.value = value;
      this.control?.setValue(value, {emitEvent: false});
      this.cdr.markForCheck();
      return;
    }

    // format displayed value
    const valueToUser = this.valueToUser(value);
    this.control?.setValue(valueToUser, {emitEvent: false});
    this.cdr.markForCheck();

    // set value for internal use
    const valueToCode = this.valueToCode(value);
    super.writeValue(valueToCode);

    // update stored value after updates
    this.value = valueToCode;
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    value = this.valueToCode(value);
    this.value = value;
    this.valueChanges.emit(value);

    // notify parent
    super.notifyUpdate(value);
    this.cdr.detectChanges();
  }

  validate(c: AbstractControl) {
    return of(c.errors);
  }

  formatValue() {
    if (this.formatOnBlur) {
      this.control.patchValue(this.valueToUser(this.value), {emitEvent: false});
    }
  }

  @HostListener('blur')
  blur() {
    this.inputElement.nativeElement.blur();
    // set tabIndex back to 0 to be able to focus the kal-input again
    this.tabIndex = 0;
  }

  @HostListener('focus')
  focus() {
    this.inputElement.nativeElement.focus();
    // set tabIndex to -1 to not trap the focus in the kal-input
    // timeout to not trigger an error during angular render process
    setTimeout(() => this.tabIndex = -1);
  }

  private valueToCode(value = this.value) {
    return this.formater.toCode(value);
  }

  private valueToUser(value = this.value) {
    return this.formater.toUser(value);
  }

  private isEmpty(value = this.value) {
    return value === '' || value === undefined || value === null;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.cdr.detach();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    this.cdr.markForCheck();
  }

  ngAfterContentInit(): void {

    // ngControl for formControl does not contain `control` on ngOnInit
    this.control = this.createControlAndSubscriptions(this.injector);

    this.controlValueChangedSubscription = this.control.valueChanges.subscribe(value => {
      // notify parent for validation
      this.notifyUpdate(value);
    });

  }
}
