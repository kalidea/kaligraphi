import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { KalOptionComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-option/kal-option.component';

describe('KalOptionComponent', () => {
  let component: KalOptionComponent;
  let fixture: ComponentFixture<KalOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [KalOptionComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call event method on click', () => {
    const spy = spyOn(component, 'emitSelectionEvent');
    const option = fixture.debugElement.query(By.css('.kal-option__selection')).nativeElement;
    option.click();

    expect(spy).toHaveBeenCalled();
  });
});
