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
import { FormElementComponent } from 'projects/kalidea/kaligraphi/src/lib/utils';

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
    const spyNotif = spyOn(FormElementComponent.prototype, 'notifyUpdate');
    spyOn(component.control, 'setValue').and.callThrough();

    const date = new Date();
    const kalDate = new KalDate(date);

    // should not emit event when getting a value
    component.writeValue(date);
    expect(component.control.setValue).toHaveBeenCalledWith(kalDate.toString(), {emitEvent: false});
    expect(spyNotif).not.toHaveBeenCalled();

    // should emit event when a date is picked
    component.setInputValue(new KalDate(date));
    expect(component.control.setValue).toHaveBeenCalledWith(kalDate.toString(), {emitEvent: true});
    expect(spyNotif).toHaveBeenCalled();
  });
});
