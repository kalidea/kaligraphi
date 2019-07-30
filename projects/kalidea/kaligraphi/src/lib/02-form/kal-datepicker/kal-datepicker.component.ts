import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { FormControl, NgControl } from '@angular/forms';
import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { DateTime } from 'luxon';

import { coerceKalDateProperty, KalDate, KalDateType } from './kal-date';
import { KalMonthCalendarComponent } from './kal-month-calendar/kal-month-calendar.component';
import { KalDatepickerHeaderComponent } from './kal-datepicker-header/kal-datepicker-header.component';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { Coerce } from '../../utils/decorators/coerce';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalInputComponent } from '../kal-input/kal-input.component';

/**
 * Possible views for the calendar.
 */
export type KalCalendarView = 'month' | 'multi';

@Component({
  selector: 'kal-datepicker',
  templateUrl: './kal-datepicker.component.html',
  styleUrls: ['./kal-datepicker.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalDatepickerComponent)
})
export class KalDatepickerComponent extends FormElementComponent<KalDate> implements AfterContentInit, OnDestroy {

  /**
   * Reference to calendar template.
   */
  @ViewChild('datepickerCalendar', {static: true}) datepickerCalendar: TemplatePortal<any>;

  /**
   * Reference to `KalMonthCalendarComponent`.
   */
  @ViewChild(KalMonthCalendarComponent, {static: false}) monthCalendar: KalMonthCalendarComponent;

  /**
   * Reference to `KalDatepickerHeaderComponent`.
   */
  @ViewChild(forwardRef(() => KalDatepickerHeaderComponent), {static: false}) datePickerHeader: KalDatepickerHeaderComponent;

  /**
   * reference to the kal input
   */
  @ViewChild(KalInputComponent, {static: true}) kalInput: KalInputComponent;

  /**
   * Whether the calendar is in month view.
   */
  currentView: KalCalendarView = 'month';


  /**
   * base control
   */
  control: FormControl;

  /**
   * Current displayed date.
   */
  currentDate: KalDate;

  /**
   * close datepicker when user select a date
   */
  @Input()
  @Coerce('boolean')
  closeOnPick = true;

  /**
   * open datepicker when user click on field
   */
  @Input()
  @Coerce('boolean')
  openOnClick = true;

  private readonly yearsIncrement = 30;

  /**
   * Subscription to `overlayRef.backdropClick()`.
   */
  @AutoUnsubscribe()
  private backdropClickSubscription = Subscription.EMPTY;

  /**
   * Subscriptions to watch.
   */
  @AutoUnsubscribe()
  private subscriptions: Subscription[] = [];

  /**
   * watch subscription outside datepicker
   */
  @AutoUnsubscribe()
  private clickOutsideSubscription = Subscription.EMPTY;

  /**
   * Overlay reference.
   */
  private overlayRef: OverlayRef;

  private _maxYear: number;

  private _minYear = 1940;

  constructor(private overlay: Overlay,
              private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef,
              private injector: Injector,
              @Optional() @Inject(DOCUMENT) private _document: any) {
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
    return month ? month.charAt(0).toLocaleUpperCase() + month.slice(1) + ' ' + date.getYear() : '';
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
      .withPush(false)
      .withPositions([
        {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'},
        {originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom'}
      ]);
  }

  /**
   * Whether the current date is valid.
   */
  private get isCurrentDateValid(): boolean {
    return this.currentDate && this.currentDate.valid;
  }

  getOverlayRef(): OverlayRef {
    if (!this.overlayRef) {
      this.createOverlay();
    }

    return this.overlayRef;
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

  open($event: MouseEvent = null, origin: 'icon' | 'mouse' = 'mouse') {
    // stop propagation of this event
    if ($event) {
      $event.stopPropagation();
    }

    // should we open overlay ?
    if (!this.disabled && (origin === 'icon' || this.openOnClick)) {
      if (!this.getOverlayRef().hasAttached()) {
        this.getOverlayRef().attach(this.datepickerCalendar);

        // watch for click outside
        this.clickOutsideSubscription = this.getOutsideClickStream()
          .pipe(take(1)) // take next outside click only
          .subscribe(() => this.close());
      }
    }
  }

  @HostListener('keydown.shift.tab')
  @HostListener('keydown.tab')
  @HostListener('keydown.enter')
  close() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.clickOutsideSubscription.unsubscribe();

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
    if (event.emitEvent && this.closeOnPick) {
      this.close();
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: KalDateType) {
    // transform given value as date
    const kalDate = coerceKalDateProperty(value);

    // store the date
    this.currentDate = kalDate;

    // update control only if provided
    if (this.control) {

      super.writeValue(kalDate);

      // if we get a `null` from the parent we should empty the input
      // and not display the current date
      this.setInputValue(value ? kalDate : null, {emitEvent: false});

    }
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

  private getOutsideClickStream(): Observable<any> {
    if (!this._document) {
      return of(null);
    }

    return merge(
      fromEvent<MouseEvent>(this._document, 'click'),
      fromEvent<TouchEvent>(this._document, 'touchend')
    )
      .pipe(filter(event => {
        const clickTarget = event.target as HTMLElement;

        const hasAttached = this.overlayRef.hasAttached();
        const datepickerContentClicked = this.elementRef.nativeElement.contains(clickTarget);
        const datepickerItselfClicked = clickTarget === this.elementRef.nativeElement;
        const overlayContentClicked = (!!this.overlayRef && this.overlayRef.overlayElement.contains(clickTarget));

        return hasAttached && !datepickerContentClicked && !datepickerItselfClicked && !overlayContentClicked;
      }));
  }

  private createOverlay(): void {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close({threshold: 300}),
      width: '240px',
    });

    // watch escape key
    const escapeKeySubscription = this.overlayRef.keydownEvents()
      .pipe(
        filter(event => event.keyCode === ESCAPE)
      )
      .subscribe(() => this.close());

    this.subscriptions.push(escapeKeySubscription);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  ngAfterContentInit(): void {

    this.control = this.createControlAndSubscriptions(this.injector, 'blur');

    // watch value changes
    const valueChangesSubscription = this.control.valueChanges.pipe(
      map(value => coerceKalDateProperty(value)), // transform as date
      map(date => date.valid ? date : null), // remove invalid date
      tap((date: KalDate) => {
        // notify parent for validation
        super.notifyUpdate(date);

        // emit value
        this.valueChanges.emit(date);

        // if there's no date we should apply one manually so the datepicker can open at the current date
        if (date === null) {
          date = new KalDate();
        }

        if (this.monthCalendar) {
          this.monthCalendar.currentDate = date;
        }

        this.currentDate = date;
      })
    ).subscribe();
    this.subscriptions.push(valueChangesSubscription);

    const focusOnKalInputSubscription = fromEvent<MouseEvent>(this.kalInput.inputElement.nativeElement, 'focus')
      .subscribe(() => this.open());
    this.subscriptions.push(focusOnKalInputSubscription);
  }
}
