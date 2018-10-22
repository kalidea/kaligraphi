import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { buildProviders, FormElementComponent } from '../../utils';

@Component({
  selector: 'kal-radio',
  templateUrl: './kal-radio.component.html',
  styleUrls: ['./kal-radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalRadioComponent implements OnInit {

  radioGroup: KalRadioGroupComponent;

  name = 'test';

  checked: boolean;

  private radioValue: string;

  constructor(@Optional() radioGroup: KalRadioGroupComponent) {
    this.radioGroup = radioGroup;
  }

  @Input()
  get value() {
    return this.radioValue;
  }
  set value(value: string) {
    this.radioValue = value;
  }

  ngOnInit() {
    this.checked = this.radioGroup.value === this.value;
  }

}

@Component({
  selector: 'kal-radio-group',
  template: `<ng-content></ng-content>`,
  providers: [...buildProviders(KalRadioGroupComponent)],
})
export class KalRadioGroupComponent extends FormElementComponent<string> implements OnInit {

  private radioValue: string;

  @Input()
  get value() {
    return this.radioValue;
  }
  set value(value: string) {
    this.radioValue = value;
    this.cd.markForCheck();
  }

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  writeValue(value: string) {
    this.value = value;

    this.cd.markForCheck();
  }

  ngOnInit() {
  }

}
