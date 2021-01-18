import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { KalTabHeaderComponent } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-header/kal-tab-header.component';

describe('KalTabHeaderComponent', () => {
  let component: KalTabHeaderComponent;
  let fixture: ComponentFixture<KalTabHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        KalTabHeaderComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
