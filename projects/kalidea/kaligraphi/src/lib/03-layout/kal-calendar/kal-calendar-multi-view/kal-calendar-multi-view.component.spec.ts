import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { KalCalendarMultiViewComponent } from './kal-calendar-multi-view.component';

describe('KalDatepickerMultiViewComponent', () => {
  let component: KalCalendarMultiViewComponent;
  let fixture: ComponentFixture<KalCalendarMultiViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ KalCalendarMultiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCalendarMultiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
