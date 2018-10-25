import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalOptionComponent } from './kal-option.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('KalOptionComponent', () => {
  let component: KalOptionComponent;
  let fixture: ComponentFixture<KalOptionComponent>;

  beforeEach(async(() => {
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
});
