import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { KalRadioChange } from './kal-radio-change';
import { uniqid } from '../../utils/helpers/uniq';

@Component({
  selector: 'kal-radio-group',
  template: `
      <ng-content></ng-content>`,
  providers: buildProviders(KalRadioGroupComponent),
})
export class KalRadioGroupComponent extends FormElementComponent<any> implements OnInit {

  /**
   * The list of all radio buttons component
   */
  @ContentChildren(forwardRef(() => KalRadioComponent), {descendants: true}) radios: QueryList<KalRadioComponent>;

  @ViewChild('input', {static: true}) input: ElementRef<HTMLInputElement>;

  /**
   * The selected radio button
   */
  private selectedRadioButton: KalRadioComponent = null;

  /**
   * The value of the selected radio button
   */
  private radioValue: string;

  /**
   * The HTML name attribute that given to all radio button in the group template
   */
  private radioButtonName = `kal-radio-button-name-${this.id}`;

  /**
   * Is the radio button gorup disabled
   */
  private disabledGroup = false;

  /**
   * The position of label after or before the radio buttons. Defaults to after
   */
  private labelRadioPosition: 'before' | 'after' = 'after';

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {
    super();
  }

  /**
   * Value of the selected radio button.
   * if the value changes, all radio buttons will be updated with the new checked value.
   */
  @Input()
  get value() {
    return this.radioValue;
  }

  set value(value: any) {
    if (this.radioValue !== value) {
      this.radioValue = value;

      this.updateSelectedRadio();
      this.cdr.markForCheck();
    }
  }

  /**
   * Name of the radio button group.
   * This name is given at all radio button in this group.
   */
  @Input()
  get name() {
    return this.radioButtonName;
  }

  set name(value: string) {
    this.radioButtonName = value;

    if (this.radios) {
      this.radios.forEach(
        radio => {
          radio.name = value;
        }
      );
    }
  }

  /**
   * Is the radio group button disabled
   */
  @Input()
  get disabled() {
    return this.disabledGroup;
  }

  set disabled(value: boolean) {
    this.disabledGroup = coerceBooleanProperty(value);
    this.markRadiosForCheck();
  }

  /**
   * The position of the label after or before the radio button. Defaults to after
   */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this.labelRadioPosition;
  }

  set labelPosition(position: 'before' | 'after') {
    this.labelRadioPosition = position === 'before' ? 'before' : 'after';
    this.markRadiosForCheck();
  }

  /**
   * The selected radio button
   * If a new radio button is selected, the radio button group value will be updated
   */
  get selected() {
    return this.selectedRadioButton;
  }

  set selected(radioComponent: KalRadioComponent) {
    this.selectedRadioButton = radioComponent;
    this.value = radioComponent ? radioComponent.value : null;
  }

  /**
   * Mark for check on all radio buttons component
   */
  markRadiosForCheck() {
    if (this.radios) {
      this.radios.forEach(radio => radio.markForCheck());
    }
  }

  /**
   * Emit an event with the selected radio buttons component and its value
   */
  emitChangeEvent() {
    this.valueChanges.emit(new KalRadioChange(this.selected, this.value));
  }

  /**
   * Update the selected radio button according to the form control value
   */
  updateSelectedRadio() {
    const isAlreadySelected = this.selected !== null && this.selected.value === this.radioValue;

    if (this.radios && !isAlreadySelected) {

      this.selectedRadioButton = null;

      this.radios.forEach(
        radio => {

          radio.checked = this.value === radio.value;

          if (radio.checked) {
            this.selectedRadioButton = radio;
          }

        }
      );
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: string) {
    super.writeValue(value);
    this.value = value;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null);
  }

}

@Component({
  selector: 'kal-radio',
  templateUrl: './kal-radio.component.html',
  styleUrls: ['./kal-radio.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalRadioComponent implements OnInit, OnDestroy {

  /**
   * The given radio group
   */
  radioGroup: KalRadioGroupComponent;

  /**
   * The HTML name attribute that given to the radio button
   */
  @Input() name: string;

  /**
   * The unique id
   */
  @Input() id = uniqid('kal-radio-button-id-');

  /**
   * Triggered when the radio button value has changed
   */
  @Output() valueChange = new EventEmitter<KalRadioChange>();

  // empty id attribute
  @HostBinding('attr.id')
  attributeId = null;

  /**
   * The position of the label after or before the radio button. Defaults to after
   */
  labelRadioPosition: 'before' | 'after';

  /**
   * Is the radio button checked
   */
  private isChecked: boolean;

  /**
   * The radio button value
   */
  private radioValue: string;

  /**
   * Is the radio disabled
   */
  private disabledRadio = false;

  constructor(@Optional() @Inject(forwardRef(() => KalRadioGroupComponent)) radioGroup: KalRadioGroupComponent,
              private radioDispatcher: UniqueSelectionDispatcher,
              private cdr: ChangeDetectorRef) {
    this.radioGroup = radioGroup;

    this.removeUniqueSelectionListener =
      radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
  }

  /**
   * The position of the label after or before the radio button. Default to after
   */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this.labelRadioPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }

  set labelPosition(position: 'before' | 'after') {
    this.labelRadioPosition = position === 'before' ? 'before' : 'after';
    this.cdr.markForCheck();
  }

  /**
   * Is the radio button disabled
   */
  @Input() get disabled() {
    return this.disabledRadio || (this.radioGroup !== null && this.radioGroup.disabled);
  }

  set disabled(value: boolean) {
    this.disabledRadio = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  /**
   * If the radio button is checked, call the notify method of the radio button group
   */
  @Input()
  get checked() {
    return this.isChecked;
  }

  set checked(value: boolean) {
    const isChecked = coerceBooleanProperty(value);

    if (this.isChecked !== isChecked) {

      this.isChecked = isChecked;

      if (this.isChecked && this.radioGroup && this.radioGroup.value !== this.value) {
        this.radioGroup.selected = this;
      } else if (!this.isChecked && this.radioGroup && this.radioGroup.value === this.value) {
        this.radioGroup.selected = null;
      }

      if (isChecked) {
        this.radioDispatcher.notify(this.id, this.name);
      }
    }
    this.cdr.markForCheck();
  }

  /**
   * The value of the radio button
   */
  @Input()
  get value() {
    return this.radioValue;
  }

  set value(value: any) {
    this.radioValue = value;
  }

  /**
   * Mark for check on the raio button
   */
  markForCheck() {
    this.cdr.markForCheck();
  }

  /**
   * Called when the radio button is clicked
   */
  changeSelectedRadio($event: Event) {
    $event.stopPropagation();
    this.checked = true;

    this.emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup.notifyUpdate(this.value);
      this.radioGroup.emitChangeEvent();
    }
  }

  /**
   * Unregister function for radioDispatcher
   */
  private removeUniqueSelectionListener: () => void = () => {};

  /**
   * Emit an event with the radio buttons component and its value
   */
  private emitChangeEvent() {
    this.valueChange.emit(new KalRadioChange(this, this.value));
  }

  ngOnInit() {
    if (this.radioGroup) {
      this.name = this.radioGroup.name;
      this.checked = this.radioGroup.value === this.value;
    }
  }

  ngOnDestroy() {
    this.removeUniqueSelectionListener();
  }

}
