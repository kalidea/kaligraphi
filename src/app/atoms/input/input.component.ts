import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {

  type = 'text';

  placeholder = '';

  clearable = false;

  content = '';

  controlChange = new FormControl('', {updateOn: 'change'});

  controlBlur = new FormControl('', {updateOn: 'blur'});

  constructor() {
  }

  ngOnInit() {
  }

}
