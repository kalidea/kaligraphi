import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { KalCheckboxComponent } from './kal-checkbox.component';

describe('KalCheckboxComponent', () => {
  let component: KalCheckboxComponent;
  let fixture: ComponentFixture<KalCheckboxComponent>;
  let elementRef: ElementRef;
  let checkbox;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KalCheckboxComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .createComponent(KalCheckboxComponent);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    elementRef = fixture.debugElement.injector.get(ElementRef);
    checkbox = fixture.debugElement.queryAll(By.css('input[type=checkbox]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains checkbox element', () => {
    expect(checkbox.length).toEqual(1);
  });

  it('should have a form control with a true value', () => {
    expect(component.control.value).toBeFalsy();

    checkbox[0].triggerEventHandler('click', null);

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

  it('should emit an event with the form control value when the value changes', () => {
    spyOn(component, 'notifyUpdate');
    spyOn(component.toggled, 'emit');

    component.control.patchValue(true);

    expect(component.notifyUpdate).toHaveBeenCalledWith(true);
    expect(component.toggled.emit).toHaveBeenCalledWith(true);
  });

  it('should update the form control value when a new value is set', () => {
    expect(component.control.value).toBeFalsy();

    component.writeValue(true);

    expect(component.control.value).toBeTruthy();
  });
});
