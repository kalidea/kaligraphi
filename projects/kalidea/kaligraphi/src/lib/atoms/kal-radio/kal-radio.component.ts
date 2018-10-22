import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import { buildProviders, FormElementComponent } from '../../utils';

let uniqueRadioButtonId = 0;

export class KalRadioChange {
  constructor(public source: KalRadioComponent, public value: string) {}
}

@Component({
  selector: 'kal-radio-group',
  template: `
    <ng-content></ng-content>`,
  providers: [...buildProviders(KalRadioGroupComponent)],
})
export class KalRadioGroupComponent extends FormElementComponent<any> implements OnInit {

  @ContentChildren(forwardRef(() => KalRadioComponent), {descendants: true}) radios: QueryList<KalRadioComponent>;
  private selectedRadioButton: KalRadioComponent = null;
  private radioValue: string;
  private radioButtonName = `kal-radio-button-name-${uniqueRadioButtonId++}`;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  @Input()
  get value() {
    return this.radioValue;
  }

  set value(value: any) {
    if (this.radioValue !== value) {
      this.radioValue = value;

      this.updateSelectedRadio();
      this.cd.markForCheck();
    }
  }

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

  get selected() {
    return this.selectedRadioButton;
  }

  set selected(radioComponent: KalRadioComponent) {
    this.selectedRadioButton = radioComponent;
    this.value = radioComponent ? radioComponent.value : null;
  }

  emitChangeEvent() {
    this.valueChange.emit(new KalRadioChange(this.selected, this.value));
  }

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

  writeValue(value: string) {
    this.value = value;
    this.cd.markForCheck();
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'kal-radio',
  templateUrl: './kal-radio.component.html',
  styleUrls: ['./kal-radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalRadioComponent implements OnInit, OnDestroy {

  radioGroup: KalRadioGroupComponent;

  private isChecked: boolean;

  private radioValue: string;

  @Input() name: string;

  private uniqueId = `kal-radio-button-id-${++uniqueRadioButtonId}`;

  @Input() id = this.uniqueId;

  private removeUniqueSelectionListener: () => void = () => {
  }

  constructor(@Optional() @Inject(forwardRef(() => KalRadioGroupComponent)) radioGroup: KalRadioGroupComponent,
              private radioDispatcher: UniqueSelectionDispatcher,
              private cd: ChangeDetectorRef) {
    this.radioGroup = radioGroup;

    this.removeUniqueSelectionListener =
      radioDispatcher.listen((id: string, name: string) => {
        if (id !== this.id && name === this.name) {
          this.checked = false;
        }
      });
  }

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
    this.cd.markForCheck();
  }

  @Input()
  get value() {
    return this.radioValue;
  }

  set value(value: any) {
    this.radioValue = value;
  }

  changeSelectedRadio($event) {
    $event.stopPropagation();
    this.checked = true;

    if (this.radioGroup) {
      this.radioGroup.notifyUpdate(this.value);
      this.radioGroup.emitChangeEvent();
    }
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
