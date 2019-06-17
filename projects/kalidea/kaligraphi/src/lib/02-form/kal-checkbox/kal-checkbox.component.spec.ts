import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { KalCheckboxComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-checkbox/kal-checkbox.component';
import { FormElementComponent } from 'projects/kalidea/kaligraphi/src/lib/utils';
import { KalCheckboxModule } from './kal-checkbox.module';

describe('KalCheckboxComponent', () => {
  let component: KalCheckboxComponent;
  let fixture: ComponentFixture<KalCheckboxComponent>;
  let checkbox: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [
        KalCheckboxComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    checkbox = fixture.debugElement.query(By.css('input[type=checkbox]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains checkbox element', () => {
    expect(checkbox).toBeTruthy();
  });

  it('should have a form control with a true value', () => {
    expect(component.control.value).toBeFalsy();

    checkbox.nativeElement.click();

    expect(component.control.value).toBeTruthy();
  });

  it('should have the formControl value to true', () => {
    component.value = false;
    component.ngOnInit();

    expect(component.control.value).toBeFalsy();

    component.value = true;
    component.ngOnInit();

    expect(component.control.value).toBeTruthy();
  });

  it('should coerce the value to a boolean value', () => {
    (component.value as any) = 'false';
    component.ngOnInit();

    expect(component.control.value).toBeFalsy();

    (component.value as any) = 'true';
    component.ngOnInit();

    expect(component.control.value).toBeTruthy();
  });

  it('should emit an event with the form control value when the value changes', () => {
    const spyNotif = spyOn(FormElementComponent.prototype, 'notifyUpdate');
    spyOn(component.valueChanges, 'emit');

    component.control.patchValue(true);

    expect(spyNotif).toHaveBeenCalledWith(true);
    expect(component.valueChanges.emit).toHaveBeenCalledWith(true);
  });

  it('should update the form control value when a new value is set', () => {
    expect(component.control.value).toBeFalsy();

    component.writeValue(true);

    expect(component.control.value).toBeTruthy();
  });

  it('should set the disabled state with formControl', () => {
    expect(component.control.disabled).toBeFalsy();

    component.setDisabledState(true);

    expect(component.control.disabled).toBeTruthy();

    component.setDisabledState(false);

    expect(component.control.disabled).toBeFalsy();
  });

  it('should set the checkbox value', () => {

    component.value = true;

    expect(component.control.value).toBeTruthy();

    component.value = false;

    expect(component.control.value).toBeFalsy();
  });

  it('should disable the checkbox', () => {

    component.disabled = true;

    expect(component.control.disabled).toBeTruthy();

    component.disabled = false;

    expect(component.control.disabled).toBeFalsy();
  });

});


const checkboxId = 'my_checkbox';

@Component({
  selector: 'kal-test',
  template: `<kal-checkbox id="${checkboxId}"></kal-checkbox>`
})
class TestComponent {

}

describe('KalCheckboxComponent with id provided', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [KalCheckboxModule],
      declarations: [
        TestComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

  });

  it('should not duplicate id attribute', () => {
    const HTMLElementsWithSameId = (fixture.nativeElement as HTMLElement).querySelectorAll('#' + checkboxId);
    expect(HTMLElementsWithSameId.length).toEqual(1);
  });
});
