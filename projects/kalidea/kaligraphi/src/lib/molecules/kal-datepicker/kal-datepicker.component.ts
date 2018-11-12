import { ChangeDetectionStrategy, Component, forwardRef, Injector, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { FormControl, NgControl } from '@angular/forms';
import { filter, map, tap } from 'rxjs/operators';
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
   * Reference to calendar template.
   */
  @ViewChild('datepickerCalendar') datepickerCalendar: TemplatePortal<any>;

  /**
   * Reference to `KalMonthCalendarComponent`.
   */
  @ViewChild(KalMonthCalendarComponent) monthCalendar: KalMonthCalendarComponent;

  /**
   * Reference to `KalDatepickerHeaderComponent`.
   */
  @ViewChild(forwardRef(() => KalDatepickerHeaderComponent)) datePickerHeader: KalDatepickerHeaderComponent;

  /**
   * Whether the calendar is in month view.
   */
  currentView: KalCalendarView = 'month';

  control = new FormControl();

  /**
   * Current displayed date.
   */
  currentDate: KalDate;

  /**
   * Subscription to `overlayRef.backdropClick()`.
   */
  private backdropClickSubscription = Subscription.EMPTY;

  /**
   * Subscription to `overlayRef.keydownEvents()` with `ESC` key.
   */
  private escapeKeySubscription = Subscription.EMPTY;

  /**
   * Overlay reference.
   */
  private overlayRef: OverlayRef;

  constructor(private overlay: Overlay,
              private injector: Injector) {
    super();
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

  get parentControlValidator() {
    const parentControl = this.injector.get(NgControl, null);
    return parentControl.control.validator;
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
    if (!this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.datepickerCalendar);
    }
  }

  close() {
    this.overlayRef.detach();

    // Set the current view to `month` because if the datepicker is
    // closed then opened it will keep its last view.
    this.currentView = 'month';
  }

  /**
   * Update the input value with the given date.
   */
  setInputValue(date: KalDate): void {
    const isDateValid = (date && date.valid) ? date : '';
    this.control.setValue(isDateValid ? date.toString() : '', {emitEvent: false});
  }

  /**
   * Update the view according to `$event` parameter.
   * If we receive a `null` value it means that we're currently displaying the `multi` view and
   * we wants to display the `month` view.
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

    // transform given value as date
    value = coerceKalDateProperty(value);

    super.writeValue(value);

    // display the given date in our input
    this.setInputValue(value);

    // store the date
    this.currentDate = value;
  }

  ngOnInit() {
    // TODO : remove backdrop when we know how to dectect click outside overlay
    this.overlayRef = this.overlay.create({
        hasBackdrop: true
      });

    this.backdropClickSubscription = this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.escapeKeySubscription = this.overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.close());

    this.control.valueChanges.pipe(
      map(value => coerceKalDateProperty(value)), // transform as date
      map(date => date.valid ? date : null), // remove invalid date
      tap((date: KalDate) => {
        // notify parent for validation
        super.notifyUpdate(date);

        // emit value
        this.valueChange.emit(date);

        this.currentDate = date;
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.backdropClickSubscription.unsubscribe();
    this.escapeKeySubscription.unsubscribe();
  }
}