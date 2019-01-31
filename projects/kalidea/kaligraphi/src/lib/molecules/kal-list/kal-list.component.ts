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
import { Observable, Subscription } from 'rxjs';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { KalListSelection } from './kal-list-selection';
import { AutoUnsubscribe } from '../../utils';

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
export class KalListComponent<T extends { id: string }> implements CollectionViewer, AfterViewInit, OnChanges, OnDestroy {

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
      this._selection.all = !this._selection.all;
      this._selection.reset();

      if (this._selection.all) {
        this._selection.selected.push(...this.results.filter(element => !this.isRowDisabled(element)));
        this._selection.excluded.push(...this.results.filter(element => this.isRowDisabled(element)));
      }

      this.cdr.markForCheck();

      this.selectionChange.emit(this._selection);
    }
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item: T) {
    if (!this.isRowDisabled(item) && this._selectionMode !== KalListSelectionMode.None) {

      this.selectedItemIndex = this.results.findIndex(row => row === item);
      this.activeItem(this.selectedItemIndex);

      this.updateSelectedItem(item);

      this.selectionChange.emit(this._selection);
    }
  }

  /**
   * Is the item selected
   */
  isRowSelected(item): boolean {
    return !item.id ? this._selection.selected.some(element => element === item) : this._selection.contains(item);
  }

  /**
   * Is the item disabled
   */
  isRowDisabled(item): boolean {
    return this.disableRowsFunction ? this.disableRowsFunction(item) : false;
  }

  hasSelectionMode(): boolean {
    return this.selectionMode !== KalListSelectionMode.None;
  }

  /**
   * Reset the selected item
   */
  reset() {
    this._selection = new KalListSelection<T>();
    this.activeItem(null);
    this.cdr.markForCheck();
  }

  /**
   * Check if items need to be grouped
   */
  containsGroupByFunction(item: T, index: number): boolean {
    const previousItem = this.results[index - 1] as T;

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

  private activeItem(index: number) {
    if (this.keyManager) {
      this.keyManager.setActiveItem(index);
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
    this.activeItem(null);
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
