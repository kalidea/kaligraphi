import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit {

  firstFormGroup: UntypedFormGroup;

  secondFormGroup: UntypedFormGroup;

  linear = true;

  constructor(private formBuilder: UntypedFormBuilder) {
  }

  selectionUpdated($event) {
  }

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      email: ['', [Validators.required]]
    });
    this.secondFormGroup = this.formBuilder.group({
      firstname: ['']
    });
  }

}
