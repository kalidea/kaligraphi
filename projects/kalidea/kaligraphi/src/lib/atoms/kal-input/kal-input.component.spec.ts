import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

import { KalInputComponent } from './kal-input.component';

@Component({
  selector: 'kal-test',
  template: `
    <kal-input
      [formControl]="formControl"
      [placeholder]="placeholder"></kal-input>
  `
})
class TestComponent {
  placeholder = 'plop';

  formControl = new FormControl();

  editValue(value) {
    this.formControl.setValue(value);
  }
}

fdescribe('KalInputComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;


  const getInput = (): HTMLInputElement => {
    return fixture.debugElement.query(By.css('input')).nativeElement;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [TestComponent, KalInputComponent]
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

  it('should display current value in input', () => {
    const value = '5';
    component.editValue(value);
    expect(getInput().value).toEqual(value);
  });

  it('should add a placeholder if provided', () => {
    const placeholder = 'JJ/MM/YYYY';
    component.placeholder = placeholder;
    fixture.detectChanges();
    expect(getInput().getAttribute('placeholder')).toEqual(placeholder);
  });
});
