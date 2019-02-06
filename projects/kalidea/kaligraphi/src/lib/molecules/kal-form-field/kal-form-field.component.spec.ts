import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { KalFormFieldComponent } from './kal-form-field.component';
import { KalFormFieldModule } from './kal-form-field.module';
import { KalInputModule } from '../../atoms/kal-input/kal-input.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-form-field>
      <kal-input [label]="label" [required]="required" [id]="for"></kal-input>
    </kal-form-field>
  `
})
export class TestComponent {
  label = 'first field';

  required = false;

  for = 'best_id_ever';
}

describe('KalFormFieldComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule],
      declarations: [TestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update label', () => {
    const label = 'First input';
    component.label = label;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeDefined();
    expect(labelElement.nativeElement.textContent.trim()).toEqual(label);
  });

  it('should update required', () => {
    const required = true;
    component.required = required;
    fixture.detectChanges();
    const requiredElement = fixture.debugElement.query(By.css('label'));
    expect(requiredElement).toBeDefined();
    expect(requiredElement.nativeElement.textContent.trim()).toBeTruthy();
  });

  it('should update for', () => {
    const id = 'better_id';
    component.for = id;
    fixture.detectChanges();
    const requiredElement: HTMLElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(requiredElement).toBeDefined();
    expect(requiredElement.getAttribute('for')).toEqual(id);
  });


});

@Component({
  selector: 'kal-test',
  template: `
    <kal-form-field>
      <kal-input [formControl]="inputCtrl"></kal-input>
    </kal-form-field>
  `
})
export class Test2Component {
  inputCtrl = new FormControl('', Validators.email);
}

describe('KalFormFieldComponent 2', () => {
  let component: Test2Component;
  let fixture: ComponentFixture<Test2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule, ReactiveFormsModule],
      declarations: [Test2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should not show error if field is pristine', () => {
    const wrapper = (fixture.debugElement.nativeElement as HTMLElement).querySelector('.kal-form-field__wrapper');

    expect(component.inputCtrl.pristine).toBeTruthy();
    expect(wrapper.classList.contains('kal-form-field--error')).toBeFalsy('should not add error class on pristine');

    const event = new KeyboardEvent('input', { key: '2' });
    const input = (fixture.nativeElement as HTMLElement).querySelector('input');
    input.value = '2';
    input.dispatchEvent(event);
    component.inputCtrl.updateValueAndValidity();
    fixture.detectChanges();

    expect(component.inputCtrl.dirty).toBeTruthy();
    expect(wrapper.classList.contains('kal-form-field--error')).toBeTruthy('should add error class on pristine');
  });
});
