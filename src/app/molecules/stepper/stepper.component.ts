import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
