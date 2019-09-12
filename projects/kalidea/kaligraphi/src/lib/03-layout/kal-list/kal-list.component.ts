import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { CollectionViewer, DataSource, isDataSource, ListRange } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import isNil from 'lodash-es/isNil';

import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalSelectionModel } from '../../utils/classes/kal-selection';
import { Coerce } from '../../utils/decorators/coerce';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

enum KalListSelectionMode {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

type KalListDataSource<T> = DataSource<T> & { total?: BehaviorSubject<number> } | Observable<T[]> | T[];

export interface KalVirtualScrollConfig {
  itemSize: number;
  height: number;
}

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T extends { id?: string }>
  implements CollectionViewer, OnInit, OnChanges, OnDestroy {

  /**
   * @inheritDoc
   */
  viewChange: Observable<ListRange>;

  @Input() highlightedItem: T = null;

  /**
   * The icon to display in all templates
   */
  @Input() icon = 'keyboard_arrow_right';

  /**
   * Function that group items in listing
   */
  @Input() groupByFunction: (item: T) => string;

  /**
   * Function that disable rows in template
   */
  @Input() disableRowsFunction: (item: T) => (boolean) = null;

  @Coerce('boolean')
  @Input()
  selectRowOnContentClick = false;

  /**
   * Triggered when selection has changed
   */
  @Output() readonly selectionChange: EventEmitter<KalSelectionModel<T>> = new EventEmitter<KalSelectionModel<T>>();

  /**
   * Triggered when an item has been highlighted
   */
  @Output() readonly highlighted: EventEmitter<T> = new EventEmitter<T>();

  /**
   * Row template
   */
  @ContentChild(KalListItemDirective, {static: true}) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;

  /**
   * Results list
   */
  results: T[] | DataSource<T> = [];

  private isInitialized = false;

  /**
   * The subscription
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private selectionSubscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private countSubscription: Subscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {
  }

  private _dataSource: KalListDataSource<T> = null;

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

  /**
   * Selectable items (none, single, multiple)
   */
  private _selectionMode: KalListSelectionMode = KalListSelectionMode.Single;

  /**
   * Selectable items (none, single, multiple)
   */
  @Input()
  get selectionMode() {
    return this._selectionMode;
  }

  set selectionMode(value: KalListSelectionMode) {

    switch (value) {
      case KalListSelectionMode.Multiple:
      case KalListSelectionMode.None:
        this._selectionMode = value;
        break;

      default:
        this._selectionMode = KalListSelectionMode.Single;
        break;
    }

    if (this.isInitialized) {
      if (this.selectionMode === KalListSelectionMode.None && !this._selection.isEmpty()) {
        this._selection.clear();
      } else {
        this._selection.multiple = value === KalListSelectionMode.Multiple;
      }
      this.countItems();
    }

    this.cdr.markForCheck();

  }

  private _selection: KalSelectionModel<T> = null;

  @Input()
  get selection(): KalSelectionModel<T> {
    return this._selection;
  }

  set selection(value: KalSelectionModel<T>) {
    if (value && (value instanceof KalSelectionModel)) {
      this._selection = value;

      if (this.isInitialized) {
        this.initSelection();
      }

      this.selectionChanges();
    } else if (this.isInitialized) {
      this._selection.clear();
    }
    this.cdr.markForCheck();
  }

  /**
   * The virtual scroll config
   */
  private _virtualScrollConfig: KalVirtualScrollConfig = {itemSize: 40, height: 500};

  @Input()
  get virtualScrollConfig(): KalVirtualScrollConfig {
    return this._virtualScrollConfig;
  }

  set virtualScrollConfig(value: KalVirtualScrollConfig) {
    value = value || {itemSize: 40, height: 500};

    this._virtualScrollConfig = {
      height: value.height || 500,
      itemSize: value.itemSize || 40
    };

    this.cdr.markForCheck();
  }

  get hasDataSource(): boolean {
    return isDataSource(this.dataSource);
  }

  initSelection() {
    const isMutliple = this.selectionMode === KalListSelectionMode.Multiple;

    if (this.selectionMode === KalListSelectionMode.None && !this._selection.isEmpty()) {
      this._selection.clear();
    } else if (this._selection.multiple !== isMutliple) {
      this._selection.multiple = isMutliple;
    }

    this.countItems();
  }

  selectAll() {
    if (this._selectionMode === KalListSelectionMode.Multiple) {
      this._selection.selectAll();
      this.cdr.markForCheck();

      this.selectionChange.emit(this._selection);
    } else {
      throw Error('Cannot select multiple rows with single selection mode.');
    }
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item) {
    if (!this.selectRowOnContentClick) {

      this.selectCheckbox(item);

    } else {

      this.highlightedItem = item;
      this.highlighted.emit(item);
    }
  }

  selectCheckbox(item, $event?) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }

    if (!this.isRowDisabled(item) && this._selectionMode !== KalListSelectionMode.None) {

      if (this._selectionMode === KalListSelectionMode.Multiple || !this._selection.isSelected(item)) {

        this._selection.toggle(item);

      }

      this.selectionChange.emit(this._selection);
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
    this.cdr.markForCheck();
    this.selectionChange.emit(this._selection);
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
  isHighlighted(item: T): boolean {
    if (!this.highlightedItem) {
      return false;
    } else if (!isNil(item.id)) {
      return this.highlightedItem.id === item.id;
    } else {
      return this.highlightedItem === item;
    }
  }

  private countItems() {
    this.countSubscription.unsubscribe();
    let numberOfItems = new BehaviorSubject(0);
    const total = (this.dataSource as DataSource<T> & { total?: BehaviorSubject<number> }).total;

    if (this.hasDataSource && total) {
      numberOfItems = total;
    } else if (this.results) {
      numberOfItems.next((this.results as T[]).length);
    }

    if (this._selection) {
      this.countSubscription = numberOfItems.pipe(
        tap(value => {
          this._selection.numberOfItems = Math.max(value, this._selection.numberOfItems);
        })
      ).subscribe();
    }
  }

  private destroySubscription() {
    this.subscription.unsubscribe();
    this.countSubscription.unsubscribe();

    if (this.dataSource && (this.dataSource as DataSource<T>).connect instanceof Function) {
      (this.dataSource as DataSource<T>).disconnect(this);
    }
  }

  private setResults(dataSource$: Observable<T[] | ReadonlyArray<T>>) {
    this.subscription = dataSource$
      .pipe(
        tap((items: T[]) => {
          this.results = items;
          this.countItems();
          this.cdr.markForCheck();
        })
      ).subscribe();
  }

  private observeDataSource() {
    if (this.hasDataSource) {
      this.results = this.dataSource as DataSource<T>;
      this.countItems();
    } else if (this.dataSource instanceof Observable) {
      this.setResults((this.dataSource as Observable<T[]>));
    } else if (Array.isArray(this.dataSource)) {
      this.setResults(of(this.dataSource as T[]));
    }
  }

  private selectionChanges() {
    this.selectionSubscription.unsubscribe();
    this.selectionSubscription = this.selection.changes
      .pipe(
        tap(() => this.cdr.markForCheck())
      ).subscribe();
  }

  ngOnInit(): void {
    if (!this._selection) {
      this._selection = new KalSelectionModel<T>({
        multiple: this.selectionMode === KalListSelectionMode.Multiple
      });
      this.selectionChanges();
    }

    this.initSelection();

    this.isInitialized = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroySubscription();
  }
}
