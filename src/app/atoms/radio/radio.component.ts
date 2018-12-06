import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KalRadioChange } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {


  /**
   * Value of radio button group
   */
  value = 'test1';

  /**
   * The form control of the radio button group
   */
  control = new FormControl(this.value);


  /**
   * Is radio button group disabled
   */
  disabled = false;

  /**
   * Id of selected radio button
   */
  id: string;

  /**
   * position of the label
   */
  labelPosition = 'after';

  /**
   * list of themes to apply
   */
  themes = [];

  constructor() {
  }

  get hasReverseTheme() {
    return this.themes ? this.themes.find(t => t === 'reverse') !== undefined : false;
  }

  /**
   * Change radio button group value by using control
   */
  changeRadioValueWithControl(value: string) {
    console.log(value);
    this.control.patchValue(value);
  }

  /**
   * Change radio button group value by using input
   */
  changeRadioValueWithEvent(value: string) {
    this.value = value;
  }

  /**
   * Display the selected radio button id and its value
   */
  displayValue($event: KalRadioChange) {
    this.id = $event.source.id;
    this.value = $event.value;
  }

  ngOnInit() {
  }

}
