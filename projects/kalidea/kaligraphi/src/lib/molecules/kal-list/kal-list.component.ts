import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { Observable, Subscription } from 'rxjs';
import { KalListItemDirective } from './kal-list-item.directive';
import { KalListItemSelectionDirective } from './kal-list-item-selection.directive';
import { CollectionViewer, DataSource, ListRange } from '@angular/cdk/collections';
import { AutoUnsubscribe } from '../../utils';

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T> implements CollectionViewer, OnInit, AfterViewInit, OnDestroy {

  /**
   * Results list
   */
  results: T[];

  /**
   * Datasource to give items list to the component
   */
  @Input() dataSource: DataSource<T> | Observable<T[]> | T[];

  /**
   * Triggered when selection has changed
   */
  @Output() selectionChange = new EventEmitter<T[] | T>();

  /**
   * Row template
   */
  @ContentChild(KalListItemDirective) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) children: QueryList<KalListItemSelectionDirective>;

  /**
   * @inheritDoc
   */
  viewChange: Observable<ListRange>;

  /**
   * Selectable items (none, single, multiple)
   */
  @Input()
  set selectable(value: string) {

    if (value === 'multiple') {
      this.itemsSelectable = 'multiple';
    } else if (value === 'none') {
      this.selectedItems = [];
      this.itemsSelectable = 'none';
    } else {
      this.selectedItems = [];
      this.itemsSelectable = null;
    }

    this.cdr.markForCheck();

  }

  /**
   * Selectable items (none, single, multiple)
   */
  itemsSelectable: 'multiple' | 'none' = null;

  /**
   * The selected items list
   */
  private selectedItems = [];

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

  /**
   * The subscription
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  /**
   * Is the row disabled
   */
  private isDisabled: (item: T) => boolean = (item: T) => false;

  constructor(private cdr: ChangeDetectorRef) {
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
   * Focus the tab element
   */
  @HostListener('focus')
  focus(): void {
    this.isFocused = true;
    this.keyManager.setActiveItem(this.selectedItemIndex);
  }

  /**
   * Blur the tab element
   */
  @HostListener('blur')
  blur() {
    this.isFocused = false;
    this.keyManager.setActiveItem(this.selectedItemIndex);
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
    if (this.itemsSelectable === 'multiple') {
      this.selectedItems = [];
      this.selectedItems.push(...this.results);
      this.selectionChange.emit(this.results);
    }
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item: T) {
    if (!this.disableRowsFunction(item) && this.itemsSelectable !== 'none') {
      this.selectedItemIndex = this.results.findIndex(row => row === item);
      this.keyManager.setActiveItem(this.selectedItemIndex);

      if (this.itemsSelectable !== 'multiple') {
        this.selectedItems = [];
        this.selectedItems.push(item);
      } else {

        const index = this.selectedItems.findIndex(row => row === item);

        if (index !== -1) {
          this.selectedItems.splice(index, 1);
        } else {
          this.selectedItems.push(item);
        }
      }

      this.selectionChange.emit(this.itemsSelectable === 'multiple' ? this.selectedItems : item);
    }
  }

  /**
   * Is the item selected
   */
  isSelected(item): boolean {
    return this.selectedItems.indexOf(item) !== -1;
  }

  /**
   * Reset the selected item
   */
  reset() {
    this.selectedItems = [];
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

  ngOnInit() {
    this.results = [];

    if ((this.dataSource as DataSource<T>).connect instanceof Function) {
      this.subscription = (this.dataSource as DataSource<T>).connect(this).subscribe(
        (items: T[]) => {
          this.results = items;
          this.cdr.markForCheck();
        }
      );
    } else if (this.dataSource instanceof Observable) {
      this.subscription = this.dataSource.subscribe(
        (items: T[]) => {
          this.results = items;
          this.cdr.markForCheck();
        }
      );
    } else if (Array.isArray(this.dataSource)) {
      this.results = this.dataSource;
      this.cdr.markForCheck();
    }
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager<KalListItemSelectionDirective>(this.children).withVerticalOrientation();
  }

  ngOnDestroy() {
    if ((this.dataSource as DataSource<T>).connect instanceof Function) {
      (this.dataSource as DataSource<T>).disconnect(this);
    }
  }
}
