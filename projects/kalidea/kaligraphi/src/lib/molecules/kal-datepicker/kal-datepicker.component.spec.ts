import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';

import { KalInputModule } from '../../atoms/kal-input/kal-input.module';
import { KalIconModule } from '../../atoms/kal-icon/kal-icon.module';

import { KalDatepickerComponent } from './kal-datepicker.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerMultiViewComponent } from './kal-datepicker-multi-view/kal-datepicker-multi-view.component';
import { KalUtilityModule } from '../../utility/kal-utility.module';

describe('KalDatepickerComponent', () => {
  let component: KalDatepickerComponent;
  let fixture: ComponentFixture<KalDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalIconModule,
        KalInputModule,
        KalUtilityModule,
        ReactiveFormsModule,
        PortalModule,
      ],
      declarations: [
        KalDatepickerComponent,
        KalDatepickerHeaderComponent,
        KalMonthCalendarComponent,
        KalDatepickerMultiViewComponent,
      ],
      providers: [
        Overlay
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
