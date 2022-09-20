import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
  encapsulation: ViewEncapsulation.None,
})

export class ButtonComponent {

  disabled = false;

  themes;

}
