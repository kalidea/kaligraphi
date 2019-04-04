import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { FormControl, NgControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';
import { coerceKalDateProperty, KalDate, KalDateType } from './kal-date';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { AutoUnsubscribe, buildProviders, FormElementComponent } from '../../utils/index';
import { Coerce } from '../../../lib/utils/decorators/coerce';

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
export class KalDatepickerComponent extends FormElementComponent<KalDate> implements OnInit {

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

  control = new FormControl(null, {updateOn: 'blur'});

  /**
   * Current displayed date.
   */
  currentDate: KalDate;

  /**
   * close datepicker when user select a date
   */
  @Input()
  @Coerce('boolean')
  closeOnPick = false;

  private readonly yearsIncrement = 30;

  /**
   * Subscription to `overlayRef.backdropClick()`.
   */
  @AutoUnsubscribe()
  private backdropClickSubscription = Subscription.EMPTY;

  /**
   * Subscription to `overlayRef.keydownEvents()` with `ESC` key.
   */
  @AutoUnsubscribe()
  private escapeKeySubscription = Subscription.EMPTY;

  /**
   * Overlay reference.
   */
  private overlayRef: OverlayRef;

  private _maxYear: number;

  private _minYear = 1940;

  constructor(private overlay: Overlay,
              private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef,
              private injector: Injector) {
    super();
  }

  /**
   * Max year that should be displayed in year selection.
   */
  @Input()
  @Coerce('number')
  get maxYear(): number {
    if (this._maxYear && this.isCurrentDateValid && this.currentDate.getYear() <= this._maxYear) {
      return this._maxYear;
    } else {
      return DateTime.local().year + this.yearsIncrement;
    }
  }

  set maxYear(maxYear: number) {
    // check if year length is valid
    if (('' + maxYear).length !== 4) {
      return;
    }

    this._maxYear = maxYear;
    this.cdr.markForCheck();
  }

  @Input()
  @Coerce('number')
  get minYear(): number {
    return this._minYear;
  }

  set minYear(minYear: number) {
    // check if year length is valid
    if (('' + minYear).length !== 4) {
      return;
    }

    this._minYear = minYear;
    this.cdr.markForCheck();
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
   * Whether the current view is the `multi` view.
   */
  get isMultiView(): boolean {
    return this.currentView === 'multi';
  }

  get parentControlValidator() {
    const parentControl = this.injector.get(NgControl, null);
    return parentControl.control.validator;
  }

  private get positionStrategy() {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'}
      ]);
  }

  /**
   * Whether the current date is valid.
   */
  private get isCurrentDateValid(): boolean {
    return this.currentDate && this.currentDate.valid;
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
  setInputValue(date: KalDate, event = {emitEvent: true}): void {
    const displayedDate = (date && date.valid) ? date.toString() : '';
    this.control.setValue(displayedDate, event);
    // close calendar if user pick
    if (!event.emitEvent && this.closeOnPick) {
      this.close();
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: KalDateType) {

    // transform given value as date
    const kalDate = coerceKalDateProperty(value);

    super.writeValue(kalDate);

    // if we get a `null` from the parent we should empty the input
    // and not display the current date
    this.setInputValue(value ? kalDate : null, {emitEvent: false});

    // store the date
    this.currentDate = kalDate;
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

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      hasBackdrop: true,
      width: '240px',
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  private initSubscriptions(): void {
    this.backdropClickSubscription = this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.escapeKeySubscription = this.overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.close());
  }

  ngOnInit() {
    this.createOverlay();
    this.initSubscriptions();

    this.control.valueChanges.pipe(
      map(value => coerceKalDateProperty(value)), // transform as date
      map(date => date.valid ? date : null), // remove invalid date
      tap((date: KalDate) => {
        // notify parent for validation
        super.notifyUpdate(date);

        // emit value
        this.valueChange.emit(date);

        // if there's no date we should apply one manually so the datepicker can open at the current date
        if (date === null) {
          date = new KalDate();
        }

        this.currentDate = date;
      })
    ).subscribe();
  }

}
