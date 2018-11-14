import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { KalRadioChange } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit {

  disabled = false;

  content = 'libellé';

  reversed = false;

  large = false;

  nivo = 'default';

  /**
   * The form control of the radio button group
   */
  control = new FormControl(this.nivo);

  /**
   * The name of radio button group by using event
   */
  nameButtonLevel = 'buttonLevel';

  constructor() { }

  reversedButton() {
    if (this.reversed) {
      this.reversed = !this.reversed;
    } else {
      this.reversed = true;
    }
  }

  enlargedButton() {
    if (this.large) {
      this.large = !this.large;
    } else {
      this.large = true;
    }
  }

  /**
   * Display the selected radio button id and its value
   */
  displayValue($event: KalRadioChange) {
    this.nivo = $event.value;
  }

  ngOnInit() {
  }

}
