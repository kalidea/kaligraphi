import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements OnInit {

  firstFormGroup: FormGroup;

  secondFormGroup: FormGroup;

  linear = true;

  constructor(private formBuilder: FormBuilder) {
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
