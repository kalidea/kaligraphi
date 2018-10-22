import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { buildProviders, FormElementComponent } from '../../utils/index';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'kal-input',
  templateUrl: './kal-input.component.html',
  styleUrls: ['./kal-input.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalInputComponent)
})
export class KalInputComponent extends FormElementComponent<string> implements OnInit {

  formControl: FormControl;

  constructor(public cdr: ChangeDetectorRef) {
    super();
  }

  writeValue(value) {
    this.formControl.setValue(value);
    super.writeValue(value);
  }

  ngOnInit() {
    this.formControl = new FormControl(this.value);
  }

}
