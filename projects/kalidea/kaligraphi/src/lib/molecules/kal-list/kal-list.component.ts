import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Host,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { Observable, Subscription } from 'rxjs';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalListSelection } from './kal-list-selection';
import { AutoUnsubscribe } from '../../utils';
import { KalVirtualScrollDirective } from '../../utility/directives/kal-virtual-scroll/kal-virtual-scroll.directive';

enum KalListSelectionMode {
  None = 'none',
  Single = 'single',
  Multiple = 'multiple'
}

type KalListDataSource<T> = DataSource<T> | Observable<T[]> | T[];

export interface VirtualScrollConfig {
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
export class KalListComponent<T extends { id: string }> implements CollectionViewer, AfterViewInit, OnDestroy {

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

  constructor(private cdr: ChangeDetectorRef,
              @Optional() @Host() private kalVirtualScrollDirective: KalVirtualScrollDirective) {
  }

  get kalVirtualScroll(): KalVirtualScrollDirective {
    return this.kalVirtualScrollDirective;
  }

  @Input()
  get selection(): KalListSelection<T> {
    return this._selection;
  }

  set selection(value: KalListSelection<T>) {
    this._selection = value && (value.constructor.name === 'KalListSelection') ? value : new KalListSelection<T>();
    this.cdr.markForCheck();
  }

  get selectionMode() {
    return this._selectionMode;
  }

  /**
   * Selectable items (none, single, multiple)
   */
  @Input()
  set selectionMode(value: KalListSelectionMode) {

    switch (value) {
      case KalListSelectionMode.Multiple:
        this._selectionMode = value;
        break;

      case KalListSelectionMode.None:
        this._selection.selected = [];
        this._selection.excluded = [];
        this._selectionMode = value;
        break;

      default:
        this._selection.selected = this._selection.selected.length > 0 ? [this._selection.selected[0]] as T[] : [];
        this._selection.excluded = [];
        this._selectionMode = KalListSelectionMode.Single;
        break;
    }

    if (this.keyManager) {
      this.keyManager.setActiveItem(null);
    }

    this.cdr.markForCheck();

  }

  /**
   * Function that group items in listing
   */
  @Input()
  get groupByFunction(): (item: T) => string {
    return this.groupByConfig;
  }

  set groupByFunction(value: (item: T) => string) {
    this.groupByConfig = value;
    this.cdr.markForCheck();
  }

  /**
   * Function that disable rows in template
   */
  @Input()
  get disableRowsFunction(): (item: T) => boolean {
    return this.isDisabled ? this.isDisabled : (item: T) => false;
  }

  set disableRowsFunction(value: (item: T) => boolean) {
    this.isDisabled = value;
    this.cdr.markForCheck();
  }

  /**
   * Return the number of elements in list
   */
  get countElements(): number {
    return this.results.length;
  }

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
  @Output() selectionChange: EventEmitter<KalListSelection<T>> = new EventEmitter<KalListSelection<T>>();

  /**
   * Row template
   */
  @ContentChild(KalListItemDirective) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;

  /**
   * The config is use to group all items
   */
  private groupByConfig: (item: T) => string = null;

  /**
   * Manages keyboard events for options in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalListItemSelectionDirective>;

  /**
   * Whether or not the select is focus
   */
  private isFocused: boolean;

  /**
   * The selected item index
   */
  private selectedItemIndex: number;

  private _dataSource: KalListDataSource<T> = null;

  private _selection: KalListSelection<T> = new KalListSelection<T>();

  /**
   * Selectable items (none, single, multiple)
   */
  private _selectionMode: KalListSelectionMode = KalListSelectionMode.Single;

  /**
   * The subscription
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  private _virtualScrollConfig: VirtualScrollConfig = null;

  /**
   * Is the row disabled
   */
  private isDisabled: (item: T) => boolean = (item: T) => false;

  /**
   * Focus the tab element
   */
  @HostListener('focus')
  focus(): void {
    this.isFocused = true;
    if (this._selectionMode !== KalListSelectionMode.None) {
      this.keyManager.setActiveItem(this.selectedItemIndex);
    }
  }

  /**
   * Blur the tab element
   */
  @HostListener('blur')
  blur() {
    this.isFocused = false;
    if (this._selectionMode !== KalListSelectionMode.None) {
      this.keyManager.setActiveItem(this.selectedItemIndex);
    }
  }

  /**
   * Handles all keydown events on the tab
   */
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    const {keyCode} = event;

    const isOpenKey = keyCode === ENTER || keyCode === SPACE;

    if (!this.isFocused) {
      return;
    }

    if (isOpenKey && this.keyManager.activeItem) {
      event.preventDefault();
      const itemToSelect = this.results.find((item, i) => i === this.keyManager.activeItemIndex);
      this.selectItem(itemToSelect);
    } else {
      this.keyManager.onKeydown(event);
    }
  }

  selectAll() {
    if (this._selectionMode === KalListSelectionMode.Multiple) {
      this._selection.all = !this._selection.all;
      this._selection.reset();

      if (this._selection.all) {
        this._selection.selected.push(...this.results.filter(element => !this.disableRowsFunction(element)));
        this._selection.excluded.push(...this.results.filter(element => this.disableRowsFunction(element)));
      }

      this.cdr.markForCheck();

      this.selectionChange.emit(this._selection);
    }
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item: T) {
    if (!this.disableRowsFunction(item) && this._selectionMode !== KalListSelectionMode.None) {

      this.selectedItemIndex = this.results.findIndex(row => row === item);
      this.keyManager.setActiveItem(this.selectedItemIndex);

      this.updateSelectedItem(item);

      this.selectionChange.emit(this._selection);
    }
  }

  /**
   * Is the item selected
   */
  isSelected(item): boolean {
    return this.selectionMode === KalListSelectionMode.Single
      ? this._selection.selected.some(element => element === item) : this._selection.contains(item);
  }

  /**
   * Reset the selected item
   */
  reset() {
    this._selection = new KalListSelection<T>();

    if (this.keyManager) {
      this.keyManager.setActiveItem(null);
    }

    this.cdr.markForCheck();
  }

  /**
   * Check if items need to be grouped
   */
  containsGroupByFunction(item: T, index: number): boolean {
    const previousItem = this.results[index - 1];

    return this.groupByFunction
      && (!previousItem || this.groupByFunction(previousItem) !== this.groupByFunction(item));
  }

  toggleItem(item: T) {
    if (this._selection.indexOf(item) === -1) {
      this._selection.add(item);
    } else {
      this._selection.remove(item);
    }
  }

  private updateSelectedItem(item: T) {

    if (this._selectionMode !== KalListSelectionMode.Multiple) {
      this._selection.selected = [];
      this._selection.add(item);
    } else if (this._selection.all) {

      const position = this._selection.indexOf(item, 'excluded');

      if (position === -1) {
        this._selection.remove(item);
        this._selection.add(item, 'excluded');
      } else {
        this._selection.remove(item, 'excluded');
        this._selection.add(item);
      }
    } else {
      this.toggleItem(item);
    }
  }

  private destroySubscription() {
    if (this.keyManager) {
      this.keyManager.setActiveItem(null);
    }
    this.subscription.unsubscribe();

    if (this.dataSource && (this.dataSource as DataSource<T>).connect instanceof Function) {
      (this.dataSource as DataSource<T>).disconnect(this);
    }
  }

  private observeDataSource() {
    if ((this.dataSource as DataSource<T>).connect instanceof Function) {
      this.subscription = (this.dataSource as DataSource<T>).connect(this).subscribe(
        (items: T[]) => {
          this.results = items;
          this.cdr.markForCheck();
        }
      );
    } else if (this.dataSource instanceof Observable) {
      this.subscription = (this.dataSource as Observable<T[]>).subscribe(
        (items: T[]) => {
          this.results = items;
          this.cdr.markForCheck();
        }
      );
    } else if (Array.isArray(this.dataSource)) {
      this.results = this.dataSource as T[];
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager<KalListItemSelectionDirective>(this.children).withVerticalOrientation();
  }

  ngOnDestroy() {
    this.destroySubscription();
  }
}
