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
  OnInit,
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
import { isNil } from 'lodash';

import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalSelectionModel } from '../../utils/classes/kal-selection';
import { Coerce } from '../../utils/decorators/coerce';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalDataSourceManager } from '../../utils/classes/kal-data-source-manager';
import { KalVirtualScrollConfig } from '../../utils/classes/kal-virtual-scroll-config';

enum KalListSelectionMode {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

type KalListDataSource<T> = DataSource<T> | Observable<T[]> | T[];

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T extends { id?: string }> implements CollectionViewer, OnInit, AfterViewInit, OnChanges, OnDestroy {

  /**
   * Results list
   */
  results: T[] = [];

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
  @ContentChild(KalListItemDirective) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;

  private isInitialized = false;

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

  /**
   * The subscription
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private selectionSubscription: Subscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef) {
  }

  private _dataSourceManager = new KalDataSourceManager<T>(this);

  /**
   * Datasource to give items list to the component
   */
  @Input()
  get dataSource(): KalListDataSource<T> {
    return this._dataSourceManager.dataSource;
  }

  set dataSource(dataSource: KalListDataSource<T>) {
    this._dataSourceManager.dataSource = dataSource;
    this.subscription.unsubscribe();
    if (dataSource) {
      this.setResults(this._dataSourceManager.observable);
    } else {
      this.results = [];
      this.cdr.markForCheck();
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

    this.activeItem(null);

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
      this.activeItem(null);
    }
    this.cdr.markForCheck();
  }

  /**
   * The virtual scroll config
   */
  private _virtualScrollConfig: KalVirtualScrollConfig = null;

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

    if (this.isInitialized) {
      if (!value) {
        this.createKeyManager();
      } else {
        this.keyManager = null;
      }
    }

    this.cdr.markForCheck();
  }

  /**
   * manage focus and blur event on listelement
   */
  @HostListener('blur', ['$event'])
  @HostListener('focus', ['$event'])
  manageUserEvent($event): void {
    this.isFocused = $event instanceof FocusEvent;
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

      this.selectedItemIndex = this.results.findIndex(row => row === item);
      this.activeItem(this.selectedItemIndex);

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
    this.activeItem(null);

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
    if (this._selection && this.results && this._selection.numberOfItems < this.results.length) {
      this._selection.numberOfItems = this.results.length;
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

  private selectionChanges() {
    this.selectionSubscription.unsubscribe();
    this.selectionSubscription = this.selection.changes.subscribe(
      () => {
        this.cdr.markForCheck();
      });
  }

  private createKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<KalListItemSelectionDirective>(this.children).withVerticalOrientation();
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

  ngAfterViewInit() {
    if (!this.virtualScrollConfig) {
      this.createKeyManager();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.markForCheck();
  }

  ngOnDestroy() {
    this.destroySubscription();
  }
}
