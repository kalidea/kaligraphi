import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-textarea',
  templateUrl: './kal-textarea.component.html',
  styleUrls: ['./kal-textarea.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalTextareaComponent)
})
export class KalTextareaComponent extends FormElementComponent<string> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
