import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { buildProviders, FormElementComponent } from '../../utils/index';

@Component({
  selector: 'kal-checkbox',
  templateUrl: './kal-checkbox.component.html',
  styleUrls: ['./kal-checkbox.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalCheckboxComponent)
})
export class KalCheckboxComponent extends FormElementComponent<boolean> implements OnInit {

  /**
   * The form control that contains the checkbox value
   */
  control = new FormControl(false);

  /**
   * Triggered when the checkbox value has changed
   */
  @Output() toggled = new EventEmitter<boolean>();

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
