import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { KalCalendarMultiViewComponent } from './kal-calendar-multi-view.component';

describe('KalDatepickerMultiViewComponent', () => {
  let component: KalCalendarMultiViewComponent;
  let fixture: ComponentFixture<KalCalendarMultiViewComponent>;

  beforeEach(async(() => {
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
