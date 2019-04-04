import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { ReactiveFormsModule } from '@angular/forms';

import { KalInputModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.module';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';

import { KalDatepickerComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker.component';
import { KalDatepickerHeaderComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker-header/kal-datepicker-header.component';
import { KalMonthCalendarComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerMultiViewComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-datepicker-multi-view/kal-datepicker-multi-view.component';
import { KalDate } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-datepicker/kal-date';
import { FormElementComponent } from 'projects/kalidea/kaligraphi/src/lib/utils';
import { KalUtilityModule } from 'projects/kalidea/kaligraphi/src/lib/99-utility/kal-utility.module';

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
