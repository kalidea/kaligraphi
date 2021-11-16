import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollDispatcher,
  ScrollStrategy
} from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Inject,
  InjectionToken,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

import { fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { filter, map, startWith, take, tap } from 'rxjs/operators';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalInputComponent } from '../kal-input/kal-input.component';
import { KalAutocompleteOption } from './kal-autocomplete-option';
import {
  KAL_AUTOCOMPLETE_DATA,
  KalAutocompleteComponent,
  KalAutocompleteComponentOption
} from './kal-autocomplete.component';
import { Coerce } from '../../utils/decorators/coerce';
import { KalAutocompleteScrollStrategy } from './kal-autocomplete-scroll-strategy';


@Directive({
  selector: 'kal-input[kalAutocomplete]',
  exportAs: 'kalAutocomplete'
})
export class KalAutocompleteDirective<T = string> implements OnInit, OnDestroy {

  @Output() readonly kalAutocompleteSelected = new EventEmitter<KalAutocompleteOption<T>>();

  @Output() readonly kalAutocompleteClosed = new EventEmitter<void>();

  /**
   * clear field on option picked
   */
  @Input() kalClearOnPick = false;

  /**
   * select when an option is clicked
   */
  @Input() kalSelectOnPick = true;

  /**
   * replace the option label by a template
   */
  @Input() kalAutocompleteOptionTemplate: TemplateRef<any>;

  /**
   * class added to kal-autocomplete component cdk-virtual-scroll-viewport
   */
  @Input() kalAutocompleteClassName: string;

  /**
   * height of kal-autocomplete component cdk-virtual-scroll-viewport
   */
  @Input() kalAutocompleteHeight = '15vh';

  /**
   * which behavior for overlay is expected on scroll ?
   * default is "overlay.scrollStrategies.close()" meaning that autocomplete overlay will automatically close on page scroll
   */
  @Input() kalScrollStrategy?: ScrollStrategy;

  /**
   * reference to autocomplete component loaded in overlay
   */
  private autocompleteComponent: KalAutocompleteComponent<T>;

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  /**
   * Separate subscription for icon clicked because it's not destroyed at the same moment
   * as other observables
   */
  private iconClickedSubscription: Subscription;

  private kalAutocompleteClosedSubscription: Subscription = Subscription.EMPTY;

  constructor(private readonly overlay: Overlay,
              private readonly injector: Injector,
              private readonly input: KalInputComponent,
              private readonly elementRef: ElementRef<HTMLElement>,
              private readonly viewContainerRef: ViewContainerRef,
              private _scrollDispatcher: ScrollDispatcher,
              private _ngZone: NgZone,
              @Optional() @Host() private readonly theme: KalThemeDirective,
              @Optional() @Inject(DOCUMENT) private _document: any) {

  }

  /**
   * options list for this autocomplete
   */

  private _optionsList: KalAutocompleteOption<T>[];

  @Input('kalAutocomplete')
  set optionsList(optionsList: KalAutocompleteOption<T>[]) {
    this._optionsList = optionsList;
    this.updateOptionsList();
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  @Input('kalAutocompleteLoading')
  @Coerce('boolean')
  set loading(loading: boolean) {
    this._loading = loading;

    if (!!this.autocompleteComponent) {
      this.autocompleteComponent.loading = loading;
    }
  }

  /**
   * reference to the overlay created
   */

  private _overlayRef: OverlayRef;

  /**
   * get reference of overlayRef and create it if don't exists
   */
  private get overlayRef(): OverlayRef {
    if (!this._overlayRef) {
      const panelClass = this.theme ? this.theme.kalThemeAsClassNames : [''];
      const config: OverlayConfig = {
        positionStrategy: this.positionsList,
        scrollStrategy: this.kalScrollStrategy || new KalAutocompleteScrollStrategy(this._scrollDispatcher, this._ngZone),
        panelClass: panelClass.concat('kal-overlay-autocomplete').join(' ').trim(),
        maxHeight: '90vh'
      };
      this._overlayRef = this.overlay.create(config);

      this.kalAutocompleteClosedSubscription = this._overlayRef.detachments().pipe(
        tap(() => {
          this.kalAutocompleteClosed.emit();
        })
      ).subscribe();

    }
    return this._overlayRef;
  }

  private get hasOverlayAttached(): boolean {
    return !!this._overlayRef && this._overlayRef.hasAttached();
  }

  private get positionsList(): FlexibleConnectedPositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withFlexibleDimensions(true)
      .withPositions([
        {
          overlayY: 'top',
          overlayX: 'start',
          originY: 'bottom',
          originX: 'start'
        }
      ]);
  }

  /**
   * Handles all keydown events on the input
   */
  @HostListener('keyup', ['$event'])
  handleKeydown(event: KeyboardEvent): void {

    const {keyCode} = event;

    // on escape, close
    if (keyCode === ESCAPE) {
      this.close();
      return;
    }

    // if overlay is not open
    if (!this._overlayRef || !this.overlayRef.hasAttached()) {
      this.open();
      return;
    }

    if ([DOWN_ARROW, UP_ARROW].indexOf(keyCode) >= 0) {
      // if arrow pressed, use keyManager
      event.preventDefault();
      event.stopPropagation();
      this.autocompleteComponent.onKeydown(event);

    } else if ([ENTER].indexOf(keyCode) >= 0) {
      // space or enter, emit selected option
      this.notifySelectionUpdate(this.autocompleteComponent.selectedOption);
    }

  }

  @HostListener('click')
  @HostListener('focusin')
  open() {

    // don't close and reopen the overlay when there's already an existing overlay
    if (this.hasOverlayAttached) {
      return;
    }

    this.close();

    const portal = new ComponentPortal(
      KalAutocompleteComponent,
      this.viewContainerRef,
      this.getPortalInjector()
    ) as ComponentPortal<KalAutocompleteComponent<T>>;
    this.autocompleteComponent = this.overlayRef.attach(portal).instance;
    this.autocompleteComponent.loading = this.loading;

    this.handleSubscriptions();
  }

  /**
   * build injector of KAL_AUTOCOMPLETE_DATA for KalAutocompleteComponent
   */
  private getPortalInjector() {
    const injectionTokens = new WeakMap<InjectionToken<KalAutocompleteComponentOption>, KalAutocompleteComponentOption>([
      [KAL_AUTOCOMPLETE_DATA, {
        width: this.input.inputElement.nativeElement.getBoundingClientRect().width + 'px',
        height: this.kalAutocompleteHeight,
        className: this.kalAutocompleteClassName,
        optionTemplate: this.kalAutocompleteOptionTemplate
      }],
    ]);
    return new PortalInjector(this.injector, injectionTokens);
  }

  /** Stream of clicks outside of the autocomplete panel. */

  private getOutsideClickStream(): Observable<any> {
    if (!this._document) {
      return of(null);
    }

    return merge(
      fromEvent<MouseEvent>(this._document, 'click'),
      fromEvent<TouchEvent>(this._document, 'touchend')
    )
      .pipe(
        map(event => event.target as HTMLElement),
        // we should not have clicked on KalInput to continue the process
        filter(target => !this.elementRef.nativeElement.contains(target)),
        filter(target => this.overlayRef.hasAttached() &&
            target !== this.elementRef.nativeElement &&
            (!!this._overlayRef && !this._overlayRef.overlayElement.contains(target)))
      );
  }

  /**
   * update autocomplete options list according to filter provided
   */
  private updateOptionsList(expression = '') {
    if (this.autocompleteComponent) {
      let optionsList = this._optionsList;
      if ((expression || '').trim() !== '') {
        try {
          const regexp = new RegExp(`.*${expression}.*`, 'i');
          optionsList = this._optionsList.filter(element => regexp.test(element.label));
        } catch (e) {
        }
      }
      this.autocompleteComponent.options = optionsList;
    }
  }

  /**
   * close autocomplete
   */
  private close() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    if (this.subscriptionsList) {
      this.subscriptionsList.forEach(subscription => subscription.unsubscribe());
    }
  }

  /**
   * notify selection was updated
   */
  private notifySelectionUpdate(option: KalAutocompleteOption<T>) {
    if (!this.kalSelectOnPick) {
      return;
    }

    this.kalAutocompleteSelected.emit(option);
    if (option) {
      this.input.writeValue(this.kalClearOnPick ? '' : option.label);
    }
    this.close();
  }

  private handleSubscriptions(): void {

    // watch for selection change
    const selectionChangeSubscription = this.autocompleteComponent.selection$
      .pipe(
        take(1),
        tap(selectedOption => this.notifySelectionUpdate(selectedOption))
      )
      .subscribe();

    // watch for input change
    const valueChangeSubscription = this.input
      .valueChanges
      .pipe(
        startWith(this.input.value),
        tap(expression => this.updateOptionsList(expression))
      )
      .subscribe();

    // watch for click outside
    const clickOutsideSubscription = this.getOutsideClickStream().pipe(tap(() => this.close())).subscribe();

    this.subscriptionsList.push(selectionChangeSubscription, valueChangeSubscription, clickOutsideSubscription);
  }

  ngOnInit(): void {
    this.input.autocomplete = 'off';

    this.iconClickedSubscription = this.input.iconClicked.asObservable()
      .pipe(
        filter(() => !this.hasOverlayAttached),
        tap(() => this.open())
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.kalAutocompleteSelected.complete();
    this.iconClickedSubscription.unsubscribe();
    this.kalAutocompleteClosedSubscription.unsubscribe();

    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

}
