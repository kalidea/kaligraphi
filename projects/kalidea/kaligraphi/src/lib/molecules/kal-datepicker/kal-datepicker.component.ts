import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceKalDateProperty, KalDate, KalDateType } from './kal-date';
import { buildProviders, FormElementComponent } from '../../utils';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

/**
 * Possible views for the calendar.
 */
export type KalCalendarView = 'month' | 'multi';

@Component({
  selector: 'kal-datepicker',
  templateUrl: './kal-datepicker.component.html',
  styleUrls: ['./kal-datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalDatepickerComponent)
})
export class KalDatepickerComponent extends FormElementComponent<KalDate> implements OnInit, OnDestroy {

  /**
   * reference to calendar
   */
  @ViewChild('datepickerCalendar') datepickerCalendar: TemplatePortal<any>;
  /**
   * reference to container
   */
  @ViewChild('datepickerContainer') datepickerContainer: ElementRef;
  /**
   * Whether the calendar is in month view
   */
  currentView: KalCalendarView = 'month';
  control = new FormControl();
  private minDate: KalDate;
  private maxDate: KalDate;
  private backdropClickSubscription = Subscription.EMPTY;
  private escapeKeySubscription = Subscription.EMPTY;
   currentDate = new KalDate();
  /**
   * Overlay Reference
   */
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay) {
    super();
  }

  @Input()
  get max(): KalDate {
    return this.maxDate;
  }

  set max(date: KalDate) {
    this.maxDate = coerceKalDateProperty(date);
  }

  @Input()
  get min(): KalDate {
    return this.minDate;
  }

  set min(date: KalDate) {
    this.minDate = coerceKalDateProperty(date);
  }

  open() {
    this.overlayRef.attach(this.datepickerCalendar);
  }

  close() {
    this.overlayRef.detach();
  }

  setInputValue(date: KalDate): void {
    this.setDateControlValueAsString(date);
  }

  /**
   * @inheritDoc
   */
  writeValue(value: KalDateType) {

    // TODO : CORRGIER COERCE. LA VALUE N'EST PAS UNE INSTANCE DE KALDATE ALORS JE ME RETROUVE
    // AVEC UN KALDATE QUI CONTIENT UN KALDATE ??????

    value = coerceKalDateProperty(value);
    super.writeValue(value);
    this.setDateControlValueAsString(value);
  }

  ngOnInit() {
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-backdrop'
    });

    this.backdropClickSubscription = this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.escapeKeySubscription = this.overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.close());
  }

  ngOnDestroy(): void {
    this.backdropClickSubscription.unsubscribe();
    this.escapeKeySubscription.unsubscribe();
  }

  /**
   * set date control value as string without emitting event
   */
  private setDateControlValueAsString(date: KalDate) {
    const dateToString = (date && date.valid) ? date.toString() : '';
    this.control.setValue(dateToString, {emitEvent: false, onlySelf: true});
  }

}
