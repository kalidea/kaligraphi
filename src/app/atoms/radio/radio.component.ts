import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioComponent implements OnInit {

  control = new FormControl('test');

  name = 'test';

  constructor() { }

  changeRadioValue(value: string) {
    this.control.patchValue(value);
  }

  ngOnInit() {
  }

}
