import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  Input, OnDestroy,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';
import { buildProviders, FormElementComponent } from '../../utils';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';

@Component({
  selector: 'kal-radio-group',
  template: `
    <button type="button" (click)="displayCheckedRadio()">Display checked radio</button>"
    <ng-content></ng-content>`,
  providers: [...buildProviders(KalRadioGroupComponent)],
})
export class KalRadioGroupComponent extends FormElementComponent<string> implements OnInit {

  @ContentChildren(forwardRef(() => KalRadioComponent), {descendants: true}) radios: QueryList<KalRadioComponent>;
  private selectedRadioButton: KalRadioComponent = null;
  private radioValue: string;
  private radioButtonName: string;

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  @Input()
  get value() {
    return this.radioValue;
  }

  set value(value: string) {
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
  }

  get selected() {
    return this.selectedRadioButton;
  }

  set selected(radioComponent: KalRadioComponent) {
    this.selectedRadioButton = radioComponent;
    this.radioValue = radioComponent ? radioComponent.value : null;
  }

  displayCheckedRadio() {
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

  private radioButtonName: string;

  private isChecked: boolean;

  private radioValue: string;

  private removeUniqueSelectionListener: () => void = () => {};

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
  get name() {
    return this.radioButtonName;
  }

  set name(value) {
    this.radioButtonName = value;
  }

  @Input()
  get checked() {
    return this.isChecked;
  }

  set checked(value) {
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

  set value(value: string) {
    this.radioValue = value;
  }

  get id() {
    return '' + this.name + this.value;
  }

  updateSelectedRadio() {
    if (this.radioGroup) {
      this.radioGroup.selected = this;
    }
  }

  changeSelectedRadio($event) {
    $event.stopPropagation();
    this.checked = true;
  }

  ngOnInit() {
    this.checked = this.radioGroup.value === this.value;
  }

  ngOnDestroy() {
    this.removeUniqueSelectionListener();
  }

}
