import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormElementComponent } from '../../utils';

@Component({
  selector: 'kal-radio',
  templateUrl: './kal-radio.component.html',
  styleUrls: ['./kal-radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalRadioComponent implements OnInit {

  radioGroup: KalRadioGroupComponent;

  private radioValue: boolean;

  constructor(@Optional() radioGroup: KalRadioGroupComponent) {
    this.radioGroup = radioGroup;
  }

  @Input()
  get value() {
    return this.radioValue;
  }
  set value(value: boolean) {
    this.radioValue = coerceBooleanProperty(value);
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'kal-radio-group',
  template: `<ng-content></ng-content>`
})
export class KalRadioGroupComponent extends FormElementComponent<boolean> implements OnInit {

  private radioValue: boolean;

  @Input()
  get value() {
    return this.radioValue;
  }
  set value(value: boolean) {
    this.radioValue = coerceBooleanProperty(value);
  }

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  writeValue(value: boolean) {
    this.value = value;

    this.cd.markForCheck();
  }

  ngOnInit() {
  }

}
