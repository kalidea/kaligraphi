import { ChangeDetectionStrategy, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { coerceKalDateProperty, KalDate, KalDateType } from './kal-date';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { buildProviders, FormElementComponent } from '../../utils';

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
   * Reference to `KalMonthCalendarComponent`
   */
  @ViewChild(KalMonthCalendarComponent) monthCalendar: KalMonthCalendarComponent;

  /**
   * Reference to `KalDatepickerHeaderComponent`
   */
  @ViewChild(KalDatepickerHeaderComponent) datePickerHeader: KalDatepickerHeaderComponent;

  /**
   * Whether the calendar is in month view
   */
  currentView: KalCalendarView = 'month';
  control = new FormControl();
  currentDate: KalDate;
  private minDate: KalDate;
  private maxDate: KalDate;
  private backdropClickSubscription = Subscription.EMPTY;
  private escapeKeySubscription = Subscription.EMPTY;

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

  /**
   * Display the current period : month as string + year.
   */
  get currentPeriod(): string {
    const date = this.monthCalendar ? this.monthCalendar.displayedDate : this.currentDate;
    const month = date.getMonthAsString();
    return month.charAt(0).toLocaleUpperCase() + month.slice(1) + ' ' + date.getYear();
  }

  /**
   * Wether the current view is the `multi` view.
   */
  get isMultiView(): boolean {
    return this.currentView === 'multi';
  }

  /**
   * Switch between views to display.
   */
  changeCurrentView() {
    this.currentView = this.isMultiView ? 'month' : 'multi';

    // We should manually trigger change detection because header arrows depends on `KalDatepickerComponent`
    // and header doesn't know when it should refresh itself.
    this.datePickerHeader.markForCheck();
  }

  open() {
    this.overlayRef.attach(this.datepickerCalendar);
  }

  close() {
    this.overlayRef.detach();

    // Set the current view to `month` because if the datepicker is
    // closed then opened it will keep it's last view.
    this.currentView = 'month';
  }

  setInputValue(date: KalDate): void {
    const dateToString = (date && date.valid) ? date.toString() : '';
    this.control.setValue(dateToString, {emitEvent: false, onlySelf: true});
  }

  /**
   * Update the view according to `$event` parameter.
   * If we receive a `null` value it means that we're currently displaying the `multi` view and
   * we want to display the `month` view.
   */
  updateView($event: number | null): void {
    if ($event === null) {
      this.changeCurrentView();
    } else {
      this.monthCalendar.updateMonth($event);
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: KalDateType) {
    value = coerceKalDateProperty(value);
    super.writeValue(value);
    this.setInputValue(value);
    this.currentDate = value;
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
}
