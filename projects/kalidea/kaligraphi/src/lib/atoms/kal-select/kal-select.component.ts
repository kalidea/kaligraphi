import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormElementComponent } from 'utils/forms/form-element.component';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalSelectComponent extends FormElementComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
