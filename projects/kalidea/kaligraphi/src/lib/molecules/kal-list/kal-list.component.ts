import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { Observable, of, Subscription } from 'rxjs';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalSelectionModel, KalSelection } from '../../utils/classes/kal-selection';
import { AutoUnsubscribe } from '../../utils';
import { Coerce } from '../../utils/decorators/coerce';

enum KalListSelectionMode {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

type KalListDataSource<T> = DataSource<T> | Observable<T[]> | T[];

export interface KalVirtualScrollConfig {
  itemSize: number;
  height: number;
}

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T> implements CollectionViewer, AfterViewInit, OnChanges, OnDestroy {

  highlighted = null;

  @Coerce('boolean')
  @Input() selectRowOnContentClick = false;

  /**
   * The icon to display in all templates
   */
  @Input() icon = 'keyboard_arrow_right';

  /**
   * Datasource to give items list to the component
   */
  @Input()
  get dataSource(): KalListDataSource<T> {
    return this._dataSource;
  }

  set dataSource(dataSource: KalListDataSource<T>) {
    if (dataSource !== this._dataSource) {
      this.destroySubscription();
      this._dataSource = dataSource;

      if (dataSource) {
        this.observeDataSource();
      } else {
        this.results = [];
        this.cdr.markForCheck();
      }
    }
  }

  @Input()
  get selection(): KalSelectionModel<T> {
    return this._selection;
  }

  set selection(value: KalSelectionModel<T>) {
    this._selection = value && (value.constructor.name === 'KalSelectionModel') ? value : new KalSelectionModel<T>();

    this.countItems();
    this.cdr.markForCheck();
  }

  @Input()
  get virtualScrollConfig(): KalVirtualScrollConfig {
    return this._virtualScrollConfig;
  }

  set virtualScrollConfig(value: KalVirtualScrollConfig) {
    if (value) {
      this._virtualScrollConfig = {
        height: value.height || 500,
        itemSize: value.itemSize || null
      };
    } else {
      this._virtualScrollConfig = null;
    }
    this.cdr.markForCheck();
  }
  /**
   * Selectable items (none, single, multiple)
   */
  @Input()
  get selectionMode() {
    return this._selectionMode;
  }

  set selectionMode(value: KalListSelectionMode) {

    const count = this._selection.count;

    switch (value) {
      case KalListSelectionMode.Multiple:
        this._selectionMode = value;
        this._selection = new KalSelectionModel({multiple: true, count});
        break;

      case KalListSelectionMode.None:
        this._selectionMode = value;
        this._selection = new KalSelectionModel({multiple: false, count});
        break;

      default:
        this._selectionMode = KalListSelectionMode.Single;
        this._selection = new KalSelectionModel({multiple: false, count});
        break;
    }

    this.countItems();
    this.activeItem(null);

    this.cdr.markForCheck();

  }

  /**
   * Function that group items in listing
   */
  @Input() groupByFunction: (item: T) => string;

  /**
   * Results list
   */
  results: T[] = [];

  /**
   * @inheritDoc
   */
  viewChange: Observable<ListRange>;

  /**
   * Triggered when selection has changed
   */
  @Output() selectionChange: EventEmitter<KalSelection<T>> = new EventEmitter<KalSelection<T>>();

  /**
   * Triggered when an item has been highlighted
   */
  @Output() highlightedItem: EventEmitter<T> = new EventEmitter<T>(null);

  /**
   * Row template
   */
  @ContentChild(KalListItemDirective) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;

  /**
   * Manages keyboard events for options in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalListItemSelectionDirective> = null;

  /**
   * Whether or not the select is focus
   */
  private isFocused: boolean;

  /**
   * The selected item index
   */
  private selectedItemIndex: number;

  private _dataSource: KalListDataSource<T> = null;

  private _selection: KalSelectionModel<T> = new KalSelectionModel<T>();

  /**
   * Selectable items (none, single, multiple)
   */
  private _selectionMode: KalListSelectionMode = KalListSelectionMode.Single;

  /**
   * The subscription
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  /**
   * The virtual scroll config
   */
  private _virtualScrollConfig: KalVirtualScrollConfig = null;

  /**
   * Function that disable rows in template
   */
  @Input() disableRowsFunction: (item: T) => (boolean) = null;

  constructor(private cdr: ChangeDetectorRef) {
  }

    /**
   * Focus the tab element
   */
  @HostListener('focus')
  focus(): void {
    this.isFocused = true;
    if (this._selectionMode !== KalListSelectionMode.None) {
      this.activeItem(this.selectedItemIndex);
    }
  }

  /**
   * Blur the tab element
   */
  @HostListener('blur')
  blur() {
    this.isFocused = false;
    if (this._selectionMode !== KalListSelectionMode.None) {
      this.activeItem(this.selectedItemIndex);
    }
  }

  /**
   * Handles all keydown events on the tab
   */
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const {keyCode} = event;

    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    if (!this.isFocused || !this.keyManager) {
      return;
    }

    if (isOpenKey && this.keyManager.activeItem) {
      event.preventDefault();
      const itemToSelect = this.results.find((item, i) => !!(i === this.keyManager.activeItemIndex));
      this.selectItem(itemToSelect);
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  selectAll() {
    if (this._selectionMode === KalListSelectionMode.Multiple) {
      this._selection = new KalSelectionModel({multiple: true, all: true, count: this._selection.count});
      this.cdr.markForCheck();

      this.selectionChange.emit(this._selection.format());
    } else {
      throw Error('Cannot select multiple rows width single selection mode.');
    }
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item) {
    if (!this.selectRowOnContentClick) {

      this.selectCheckbox(item);

    } else {

        this.highlighted = item;
        this.highlightedItem.emit(item);
      }
  }

  selectCheckbox(item, $event?) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (!this.isRowDisabled(item) && this._selectionMode !== KalListSelectionMode.None) {

      this.selectedItemIndex = this.results.findIndex(row => row === item);
      this.activeItem(this.selectedItemIndex);

      if (this._selectionMode === KalListSelectionMode.Multiple || !this._selection.isSelected(item)) {

        this._selection.toggle(item);

      }

      this.selectionChange.emit(this._selection.format());
    }

  }

  /**
   * Is the item selected
   */
  isRowSelected(item): boolean {
    return this.selection.isSelected(item);
  }

  /**
   * Is the item disabled
   */
  isRowDisabled(item): boolean {
    return this.disableRowsFunction ? this.disableRowsFunction(item) : false;
  }

  /**
   * Reset the selected item
   */
  clear() {
    this._selection.clear();
    this.activeItem(null);

    this.cdr.markForCheck();

    this.selectionChange.emit(this._selection.format());
  }

  /**
   * Check if items need to be grouped
   */
  containsGroupByFunction(item: T, index: number): boolean {
    const previousItem = this.results[index - 1] as T;

    return this.groupByFunction
      && (!previousItem || this.groupByFunction(previousItem) !== this.groupByFunction(item));
  }

  /**
   * Is the item highlighted
   */
  isHighlighted(item): boolean {
    return !!this.highlighted && this.highlighted.id === item.id;
  }

  private countItems() {
    if (this._selection && this._selection.count < this.results.length) {
      this._selection.count = this.results.length;
    }
  }

  private activeItem(index: number) {
    if (this.keyManager) {
      this.keyManager.setActiveItem(index);
    }
  }

  private destroySubscription() {
    this.activeItem(null);
    this.subscription.unsubscribe();

    if (this.dataSource && (this.dataSource as DataSource<T>).connect instanceof Function) {
      (this.dataSource as DataSource<T>).disconnect(this);
    }
  }

  private setResults(dataSource$: Observable<T[] | ReadonlyArray<T>>) {
    this.subscription = dataSource$.subscribe(
      (items: T[]) => {
        this.results = items;
        this.countItems();
        this.cdr.markForCheck();
      }
    );
  }

  private observeDataSource() {
    if ((this.dataSource as DataSource<T>).connect instanceof Function) {
      this.setResults((this.dataSource as DataSource<T>).connect(this));
    } else if (this.dataSource instanceof Observable) {
      this.setResults((this.dataSource as Observable<T[]>));
    } else if (Array.isArray(this.dataSource)) {
      this.setResults(of(this.dataSource as T[]));
    }
  }

  ngAfterViewInit() {
    if (!this.virtualScrollConfig) {
      this.keyManager = new ActiveDescendantKeyManager<KalListItemSelectionDirective>(this.children).withVerticalOrientation();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroySubscription();
  }
}
