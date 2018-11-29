import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent implements OnInit {


  themes = [];

  type = 'text';

  placeholder = '';

  clearable = false;

  icon = '';

  content = '';

  controlChange = new FormControl('', {updateOn: 'change'});

  controlBlur = new FormControl('', {updateOn: 'blur'});

  lastIconClicked;

  constructor() {
  }

  iconClicked($event) {
    console.log($event);
    this.lastIconClicked = $event;
  }

  ngOnInit() {
  }

}
