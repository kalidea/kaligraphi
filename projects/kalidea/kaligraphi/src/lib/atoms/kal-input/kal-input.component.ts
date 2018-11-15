import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { of, Subscription } from 'rxjs';

import { InputFormater } from './format/input-formater';
import { NumberFormat } from './format/number.format';
import { CurrencyFormat } from './format/currency.format';
import { PhoneFormat } from './format/phone.format';
import { StringFormat } from './format/string.format';

import { buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-input',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent<string> implements OnDestroy, AfterContentInit {

  /**
   * list of formaters
   */
  private static formatersList: { [key: string]: InputFormater } = {
    'number': new NumberFormat(),
    'currency': new CurrencyFormat(),
    'phone': new PhoneFormat(),
    'text': new StringFormat(),
    'password': new StringFormat()
  };

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

  control: FormControl;

  @Output() readonly iconClicked = new EventEmitter();

  private controlChangedSubscription = Subscription.EMPTY;

  /**
   * event to trigger change
   */
  private updateOnEvent: 'change' | 'blur' | 'submit' = 'change';

  private isClearable = false;

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {
    super();
  }

  get htmlInputType() {
    if (this.type === 'password') {
      return this.type;
    } else {
      return 'text';
    }
  }

  @Input()
  get clearable(): boolean {
    return this.isClearable;
  }

  set clearable(clearable: boolean) {
    this.isClearable = coerceBooleanProperty(clearable);
    this.cdr.markForCheck();
  }

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return KalInputComponent.formatersList[this.type] || KalInputComponent.formatersList['text'];
  }

  @Input()
  set updateOn(event) {
    if (['change', 'blur', 'submit'].indexOf(event) === -1) {
      throw Error('updateOn should be one of change, blur, submit');
    }
    this.updateOnEvent = event;
  }

  clearField() {
    this.control.setValue('');
  }

  customIconClicked() {
    this.iconClicked.emit();
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    this.value = value;
    if (this.control) {
      value = this.formater.toUser(value);
      this.control.setValue(value, {emitEvent: true});
      super.writeValue(value);
    }
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    this.value = value;

    // update form control
    this.control.patchValue(value, {emitEvent: false});

    // notify parent
    super.notifyUpdate(this.formater.toCode(value));
    this.cdr.detectChanges();
  }

  validate(c: AbstractControl) {
    return of(c.errors);
  }

  ngOnDestroy(): void {
    this.controlChangedSubscription.unsubscribe();
  }

  ngAfterContentInit(): void {

    // ngControl for formControl does not contain `control` on ngOnInit
    this.ngControl = this.injector.get(NgControl, null);

    // grab updateOn property from control
    let updateOn;
    if (this.ngControl && this.ngControl.control) {
      updateOn = this.ngControl && this.ngControl.control ? this.ngControl.control.updateOn : undefined;
    }

    this.control = new FormControl(this.value, {updateOn});

    this.controlChangedSubscription = this.control.valueChanges.subscribe(value => {
      // notify parent for validation
      this.notifyUpdate(value);
    });
  }

}
