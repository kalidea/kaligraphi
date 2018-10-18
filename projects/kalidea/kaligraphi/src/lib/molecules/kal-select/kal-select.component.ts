import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-select',
  templateUrl: './kal-select.component.html',
  styleUrls: ['./kal-select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSelectComponent)
})
export class KalSelectComponent extends FormElementComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
