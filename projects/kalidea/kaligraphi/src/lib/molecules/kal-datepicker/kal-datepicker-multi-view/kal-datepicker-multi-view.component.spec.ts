import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view.component';

describe('KalDatepickerMultiViewComponent', () => {
  let component: KalDatepickerMultiViewComponent;
  let fixture: ComponentFixture<KalDatepickerMultiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalDatepickerMultiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerMultiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
