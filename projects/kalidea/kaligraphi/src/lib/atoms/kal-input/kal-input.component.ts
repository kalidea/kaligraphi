import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { buildProviders, FormElementComponent } from '../../utils/index';
import { InputFormater } from './format/input-formater';
import { NumberFormat } from './format/number.format';
import { CurrencyFormat } from './format/currency.format';
import { PhoneFormat } from './format/phone.format';
import { StringFormat } from './format/string.format';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-input',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent<string> implements OnInit {

  /**
   * list of formaters
   */
  private static formatersList: { [key: string]: InputFormater } = {
    'number': new NumberFormat(),
    'currency': new CurrencyFormat(),
    'phone': new PhoneFormat(),
    'text': new StringFormat()
  };

  /**
   * type of input  ( text, password, email, number, ... )
   */
  @Input() type = 'text';

  @Input() max: number;

  @Input() min: number;

  control: FormControl;

  private updateOnEvent: 'change' | 'blur' | 'submit' = 'change';

  private isClearable = false;

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  get countable() {
    return this.type === 'text' && this.max !== undefined;
  }

  get clearable() {
    return this.isClearable;
  }

  @Input()
  set clearable(clearable) {
    this.isClearable = coerceBooleanProperty(clearable);
    this.cdr.markForCheck();
  }

  @Input()
  set updateOn(event) {
    if (['change', 'blur', 'submit'].indexOf(event) === -1) {
      throw Error('updateOn should be one of change, blur, submit');
    }
    this.updateOnEvent = event;
  }

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return KalInputComponent.formatersList[this.type] || KalInputComponent.formatersList['text'];
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    this.value = value;
    value = this.formater.toUser(value);
    this.control.setValue(value, {emitEvent: true});
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    value = this.limiter(value);
    this.value = value;
    value = this.formater.toCode(value);
    super.notifyUpdate(value);
    this.cdr.markForCheck();
  }

  private limiter(value) {
    if (this.max) {
      if (this.type === 'number') {
        value = Math.min(value, this.max);
      } else if (this.type === 'string') {
        value = value.substring(0, this.max);
      }
    }

    if (this.min) {
      if (this.type === 'number') {
        value = Math.max(value, this.min);
      }
    }
    return value;
  }

  ngOnInit() {
    this.control = new FormControl(this.value, {updateOn: this.updateOnEvent});

    const subscription = this.control.valueChanges.subscribe(value => {
      // notify parent for validation
      this.notifyUpdate(value);
    });
  }

}
