import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ActiveDescendantKeyManager, Highlightable } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { KalListItemDirective } from './kal-list-item.directive';

@Directive({
  selector: '[kalListItemSelection]'
})
export class KalListItemSelectionDirective implements Highlightable {

  /**
   * Is a tab highlighted
   */
  highlighted: boolean;

  setActiveStyles(): void {
    this.highlighted = true;
    this.renderer.addClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  setInactiveStyles(): void {
    this.highlighted = false;
    this.renderer.removeClass(this.el.nativeElement, 'kal-list-item-highlighted');
  }

  constructor(public el: ElementRef,
              private renderer: Renderer2) {
  }

}

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T> implements OnInit, AfterViewInit {

  /**
   * Results list
   */
  results: T[];

  /**
   * Datasource to give items list to the component
   */
  @Input() datasource: any;

  /**
   * Triggered when selection has changed
   */
  @Output() selectionChange = new EventEmitter<T>();

  /**
   * Row template
   */
  @ContentChild(KalListItemDirective) row: KalListItemDirective;

  /**
   * The reference to the element thats contains the kal list item directive
   */
  @ViewChildren(KalListItemSelectionDirective) items: QueryList<KalListItemSelectionDirective>;

  /**
   * The selected item
   */
  private selectedItem = null;

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
      this.selectItem(itemToSelect, this.keyManager.activeItemIndex);
    } else {
      this.keyManager.onKeydown(event);
    }
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
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item: T, index: number) {
    if (!this.disableRowsFunction(item)) {
      this.selectedItemIndex = index;
      this.selectedItem = item;
      this.keyManager.setActiveItem(this.selectedItemIndex);
      this.selectionChange.emit(item);
    }
  }

  /**
   * Is the item selected
   */
  isSelected(item): boolean {
    return this.selectedItem === item;
  }

  /**
   * Reset the selected item
   */
  reset() {
    this.selectedItem = null;
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

    if (this.datasource) {
      this.datasource.connect().subscribe(
        element => {
          this.results = element;
        }
      );
    }
  }

  ngAfterViewInit() {
    this.keyManager = new ActiveDescendantKeyManager<KalListItemSelectionDirective>(this.items).withVerticalOrientation();
  }
}
