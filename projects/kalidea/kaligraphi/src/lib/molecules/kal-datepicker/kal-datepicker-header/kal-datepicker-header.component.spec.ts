import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalDatepickerHeaderComponent } from './kal-datepicker-header.component';

describe('KalDatepickerHeaderComponent', () => {
  let component: KalDatepickerHeaderComponent;
  let fixture: ComponentFixture<KalDatepickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalDatepickerHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
