import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { KalVirtualScrollConfig } from '../../03-layout/kal-list/kal-list.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalOptionComponent } from '../kal-option/kal-option.component';

import { KalAutocompleteOption } from './kal-autocomplete-option';

export interface KalAutocompleteComponentOption {
  width?: string;
  height?: string;
  className?: string;
  optionTemplate?: TemplateRef<any>;
}

/**
 * token to inject to retrieve data from dialog
 */
export const KAL_AUTOCOMPLETE_DATA = new InjectionToken<KalAutocompleteComponentOption>('KalAutoCompleteData');

@Component({
  selector: 'kal-autocomplete',
  templateUrl: './kal-autocomplete.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalAutocompleteComponent<T> implements AfterViewInit, OnDestroy {

  static readonly id = 'kal-autocomplete-scroll-viewport';

  /**
   * custom width of scroll container ( default to kal-input width )
   */
  width: string;

  height: string;

  /**
   * custom of scroll container
   */
  className: string;

  private selectionSubject = new Subject<KalAutocompleteOption<T>>();

  /**
   * All of the defined select optionsComponent
   */
  @ViewChildren(KalOptionComponent)
  private optionsComponent: QueryList<KalOptionComponent>;

  /**
   * Manages keyboard events for optionsComponent in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  @AutoUnsubscribe()
  private subscription: Subscription;

  constructor(private cdr: ChangeDetectorRef,
              @Inject(KAL_AUTOCOMPLETE_DATA) public readonly  data: KalAutocompleteComponentOption) {
    this.width = data.width;
    this.height = data.height;
    this.className = data.className;
  }

  get id() {
    return KalAutocompleteComponent.id;
  }

  /**
   * list of options
   */
  private _options: KalAutocompleteOption<T>[];

  get options(): KalAutocompleteOption<T>[] {
    return this._options;
  }

  set options(options: KalAutocompleteOption<T>[]) {
    this._options = options;
    this.cdr.markForCheck();
  }

  /**
   * The virtual scroll config
   */
  private _virtualScrollConfig: KalVirtualScrollConfig = {itemSize: 27};

  @Input()
  get virtualScrollConfig(): KalVirtualScrollConfig {
    return this._virtualScrollConfig;
  }

  set virtualScrollConfig(value: KalVirtualScrollConfig) {
    value = value || {itemSize: 40};

    this._virtualScrollConfig = {
      height: value.height || null,
      itemSize: value.itemSize || 40
    };

    this.cdr.markForCheck();
  }

  private _loading = false;

  get loading(): boolean {
    return this._loading;
  }

  set loading(loading: boolean) {
    this._loading = loading;
    this.cdr.markForCheck();
  }

  /**
   * get option selected with keyManager
   */
  get selectedOption(): KalAutocompleteOption<T> {
    return this.keyManager.activeItem ? this.keyManager.activeItem.value : null;
  }

  /**
   * get selection as observable
   */
  get selection$(): Observable<KalAutocompleteOption<T>> {
    return this.selectionSubject.asObservable();
  }

  /**
   * manage keydown for this event
   * do not expose keymanager
   */
  onKeydown(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }

  /**
   * triggered when user is focusing out
   */
  close() {
    this.select(null);
  }

  /**
   * select option
   */
  select(option: KalAutocompleteOption<T>) {
    if (option.disabled) {
      return;
    }

    this.selectionSubject.next(option);
    this.selectionSubject.complete();
  }

  /**
   * build class for scroll container if provided
   */
  getClasses() {
    if (this.className) {
      return {
        [this.className]: true
      };
    }
    return {};
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.optionsComponent.filter(opt => !opt.disabled))
      .withVerticalOrientation()
      .withWrap()
      .withTypeAhead(0);
  }

  ngAfterViewInit(): void {
    this.subscription = this.optionsComponent.changes
      .pipe(startWith(0))
      .subscribe(() => {
        this.initKeyManager();
      });

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
  }
}
