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

  it('should contains checbox element', () => {
    expect(checkbox.length).toEqual(1);
  });
});
