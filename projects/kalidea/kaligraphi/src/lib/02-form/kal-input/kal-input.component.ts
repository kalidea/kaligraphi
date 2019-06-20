import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, HostBinding,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormHooks } from '@angular/forms/src/model';
import { of, Subscription } from 'rxjs';

import { InputFormater } from './format/input-formater';
import { KalFormaterService } from './kal-formater.service';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { Coerce } from '../../utils/decorators/coerce';


@Component({
  selector: 'kal-input',
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

  @Output() readonly iconClicked = new EventEmitter<MouseEvent>();

  /**
   * event to trigger change
   */
  @Input() updateOnEvent: FormHooks = 'change';

  @Input()
  @Coerce('boolean')
  clearable = false;

  /**
   * Reference to native input
   */
  @ViewChild('input') inputElement: ElementRef<HTMLInputElement>;

  // empty id attribute
  @HostBinding('attr.id')
  attributeId = null;

  @AutoUnsubscribe()
  private controlValueChangedSubscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector,
              private formaters: KalFormaterService) {
    super();
  }

  get htmlInputType() {
    if (this.type === 'password') {
      return this.type;
    } else {
      return 'text';
    }
  }

  /**
   * get formater for this type
   */
  get formater(): InputFormater {
    return this.formaters.get(this.type);
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
    if (this.control) {
      value = this.formater.toUser(value);

      // update displayed value
      this.inputElement.nativeElement.value = value;

      super.writeValue(value);

      this.cdr.markForCheck();
    }
  }

  /**
   * @inheritDoc
   * overload notifyupdate
   */
  notifyUpdate(value) {
    value = this.formater.toCode(value);

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
      this.control.patchValue(this.formater.toUser(this.control.value), {emitEvent: false});
    }
  }

  blur() {
    this.inputElement.nativeElement.blur();
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

  }
}
