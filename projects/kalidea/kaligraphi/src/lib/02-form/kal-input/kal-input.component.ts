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

import { InputFormater } from './format/input-formater';
import { KalFormaterService } from './kal-formater.service';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { Coerce } from '../../utils/decorators/coerce';
import { FormHooks } from '../../utils/forms/form-hooks';

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
export class KalInputComponent extends FormElementComponent<string> implements OnChanges, OnDestroy, AfterContentInit {

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
   * should the formating be ignored on empty value
   */
  @Coerce('boolean')
  @Input() nullable = false;

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

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector,
              private formaters: KalFormaterService,
              @Optional() @Inject(KAL_INPUT_GLOBAL_OPTIONS) private inputOptions: KalInputOptions) {
    super();
    this.clearable = this.inputOptions ? this.inputOptions.clearable : false;
  }

  private _clearable: boolean;

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

  get shouldFormat(): boolean {
    return !this.nullable && (this.value === null || this.value === undefined || this.value === '');
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
    this.value = value;

    if (this.control) {
      if (this.shouldFormat) {
        value = this.formater.toUser(value);
      }

      this.value = value;
      this.control.setValue(value, {emitEvent: false});

      super.writeValue(value);

      this.cdr.markForCheck();
    }
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    this.value = value;

    this.valueChanges.emit(value);

    // notify parent
    super.notifyUpdate(this.shouldFormat ? this.formater.toCode(value) : value);
    this.cdr.detectChanges();
  }

  validate(c: AbstractControl) {
    return of(c.errors);
  }

  formatValue() {
    if (this.formatOnBlur && this.shouldFormat) {
      this.control.patchValue(this.formater.toUser(this.value), {emitEvent: false});
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
