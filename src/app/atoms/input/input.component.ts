import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit {

  type = 'text';
  placeholder = '';
  clearable = false;

  constructor() { }

  ngOnInit() {
  }

}
