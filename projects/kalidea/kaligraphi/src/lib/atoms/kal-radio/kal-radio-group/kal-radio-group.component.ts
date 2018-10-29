import { ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, OnInit, QueryList, } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { KalRadioComponent } from '../kal-radio/kal-radio.component';
import { buildProviders, FormElementComponent } from '../../../utils';
import { KalRadioChange } from '../kal-radio-change';

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

  constructor(private cdr: ChangeDetectorRef) {
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
    this.valueChange.emit(new KalRadioChange(this.selected, this.value));
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
   * Set the disabled state of the radio button group
   */
  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  /**
   * @inheritDoc
   */
  writeValue(value: string) {
    super.writeValue(value);
    this.value = value;
    this.cdr.markForCheck();
  }

  ngOnInit() {
  }

}
