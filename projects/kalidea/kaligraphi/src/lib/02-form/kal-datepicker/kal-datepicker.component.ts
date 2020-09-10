import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  OnDestroy,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {ESCAPE} from '@angular/cdk/keycodes';
import {DOCUMENT} from '@angular/common';
import {FormControl, NgControl} from '@angular/forms';
import {fromEvent, merge, Observable, of, Subscription} from 'rxjs';
import {filter, map, take, tap} from 'rxjs/operators';
import dayjs from 'dayjs';

import {coerceKalDateProperty, KalDate, KalDateType} from './kal-date';
import {buildProviders, FormElementComponent} from '../../utils/forms/form-element.component';
import {KalInputComponent} from '../kal-input/kal-input.component';
import {Coerce} from '../../utils/decorators/coerce';
import {AutoUnsubscribe} from '../../utils/decorators/auto-unsubscribe';


/**
 * Possible views for the calendar.
 */
export type KalCalendarView = 'month' | 'multi';

@Component({
  selector: 'kal-datepicker',
  exportAs: 'kalDatepicker',
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
   * reference to the kal input
   */
  @ViewChild(KalInputComponent, {static: true}) kalInput: KalInputComponent;

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

  constructor(private overlay: Overlay,
              private elementRef: ElementRef<HTMLElement>,
              private cdr: ChangeDetectorRef,
              private injector: Injector,
              @Optional() @Inject(DOCUMENT) private _document: any) {
    super();
  }

  private _maxYear: number;

  /**
   * Max year that should be displayed in year selection.
   */
  @Input()
  @Coerce('number')
  get maxYear(): number {
    if (this._maxYear) {
      return this._maxYear;
    } else if (this.isCurrentDateValid) {
      return this.currentDate.getYear() + this.yearsIncrement;
    } else {
      return dayjs().year() + this.yearsIncrement;
    }
  }

  set maxYear(maxYear: number) {
    // check if we have a value and year length is valid
    if (maxYear && ('' + maxYear).length !== 4) {
      return;
    }

    this._maxYear = maxYear;
    this.cdr.markForCheck();
  }

  private _minYear = 1940;

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
   * Returns the date stored in the datepicker if it's valid else the current date.
   * We should do this to still display something with the datepicker even if the given
   * date is invalid.
   */
  get selectedDate(): KalDate {
    return this.currentDate.valid ? this.currentDate : new KalDate();
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

  toggle() {
    if (this.getOverlayRef().hasAttached()) {
      this.close();
    } else {
      this.open(null, 'icon');
    }
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

  ngOnDestroy() {
    super.ngOnDestroy();
    this.close();
  }

  ngAfterContentInit(): void {

    this.control = this.createControlAndSubscriptions(this.injector, 'blur');

    // watch value changes
    const valueChangesSubscription = this.control.valueChanges.pipe(
      map(value => !!value ? coerceKalDateProperty(value) : null), // transform as date or send null if the input is empty
      tap((date: KalDate) => {
        // notify parent for validation
        super.notifyUpdate(date);

        // emit value
        this.valueChanges.emit(date);

        // if there's no date or if the given input is invalid, we should apply one
        // date manually so the datepicker can open at the current date
        if (date === null || !date.valid) {
          date = new KalDate();
        }

        this.currentDate = date;
      })
    ).subscribe();
    this.subscriptions.push(valueChangesSubscription);

    const focusOnKalInputSubscription = fromEvent<MouseEvent>(this.kalInput.inputElement.nativeElement, 'focus')
      .subscribe(() => this.open());
    this.subscriptions.push(focusOnKalInputSubscription);
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
}
