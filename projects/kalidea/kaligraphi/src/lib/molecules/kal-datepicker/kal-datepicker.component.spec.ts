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
import { KalDate } from 'projects/kalidea/kaligraphi/src/lib/molecules/kal-datepicker/kal-date';

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

  it('should not emit a KalDate when a writeValue occurs', () => {
    spyOn(component.control, 'valueChanges');
    spyOn(component.control, 'setValue').and.callThrough();

    const date = new Date();

    component.writeValue(date);

    expect(component.control.setValue).toHaveBeenCalledWith(new KalDate(date).toString(), {emitEvent: false});
    expect(component.control.valueChanges).not.toHaveBeenCalled();
  });
});
