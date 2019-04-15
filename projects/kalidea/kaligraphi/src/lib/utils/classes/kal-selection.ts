import { SelectionModel } from '@angular/cdk/collections';
import { isNil } from 'lodash/isNil';
import { Observable, Subject } from 'rxjs';

export class KalSelection<T extends { id?: string }> {

  /**
   * Number of elements in list
   */
  numberOfItems ? = 0;

  /**
   * List of added elements
   */
  added?: T[] = [];

  /**
   * List of removed elements
   */
  removed?: T[] = [];

  /**
   * Check if all items are selected
   */
  all ? = false;

  /**
   * Is a multiple selection
   */
  multiple ? = false;

  /**
   * Number of selected elements in list
   */
  numberOfSelectedItems ? = 0;
}

class SubSelectionModel<T extends { id?: string }> extends SelectionModel<T> {

  getItem(item: T): T {
    if (!isNil(item.id)) {
      return this.selected.find(element => !!('' + element.id === '' + item.id));
    } else {
      return item;
    }
  }

  isSelected(item: T): boolean {
    return super.isSelected(this.getItem(item) || item);
  }

  select(...items: T[]): void {
    const filteredItems = items.filter(item => !this.isSelected(item));
    super.select(...filteredItems);
  }

  deselect(...items: T[]): void {
    const filteredItems = [];

    items.forEach(item => {
      filteredItems.push(this.getItem(item));
    });

    super.deselect(...filteredItems);
  }

}

export class KalSelectionModel<T extends { id?: string }> extends SelectionModel<T> {

  numberOfItems = 0;

  private addedSelection: SubSelectionModel<T>;

  private removedSelection: SubSelectionModel<T>;

  private _all = false;

  private isMultiple = false;

  private readonly changes$: Subject<KalSelection<T>> = new Subject<KalSelection<T>>();

  // changed: Subject<KalSelection<T>>;

  constructor(params?: KalSelection<T>) {
    super();

    // destructure and add default value
    const {
      added,
      all,
      removed,
      numberOfItems,
      multiple,
    } = {...new KalSelection(), ...params};

    this.initSelection(added.length > 1 || all ? true : multiple, added as T[], removed as T[]);

    this._all = all;
    this.numberOfItems = numberOfItems;
  }

  private initSelection(isMultiple: boolean, added: T[], removed: T[]) {
    this.addedSelection = new SubSelectionModel<T>(isMultiple, [], true);
    this.removedSelection = new SubSelectionModel<T>(isMultiple, [], true);

    if (isMultiple) {
      this.addedSelection.select(...(added as T[]));
      this.removedSelection.select(...(removed as T[]));
    } else if (added.length > 0) {
      this.addedSelection.select(added[0] as T);
      this._all = false;
    }

    this.isMultiple = isMultiple;
  }

  /**
   * get number of selected items
   */
  get total(): number {
    return this._all ? this.numberOfItems - this.removedSelection.selected.length : this.addedSelection.selected.length;
  }

  private get store(): SelectionModel<T> {
    return this._all ? this.removedSelection : this.addedSelection;
  }

  select(item: T): void {
    this._all ? this.removedSelection.deselect(item) : this.addedSelection.select(item);
    this.changes$.next(this.format());
  }

  deselect(item: T): void {
    this._all ? this.removedSelection.select(item) : this.addedSelection.deselect(item);
    this.changes$.next(this.format());
  }

  toggle(item: T): void {
    this._all ? this.removedSelection.toggle(item) : this.addedSelection.toggle(item);
    this.changes$.next(this.format());
  }

  selectAll() {
    this.clear({emitEvent: false});
    this._all = true;

    this.changes$.next(this.format());
  }

  clear({emitEvent}: {emitEvent: boolean} = {emitEvent: true}): void {
    this.addedSelection.clear();
    this.removedSelection.clear();
    this._all = false;

    if (emitEvent) {
      this.changes$.next(this.format());
    }
  }

  isSelected(item: T): boolean {
    return this._all ? !this.removedSelection.isSelected(item) : !!this.addedSelection.isSelected(item);
  }

  isEmpty(): boolean {
    return this._all ? this.numberOfItems === this.removedSelection.selected.length : this.addedSelection.isEmpty();
  }

  get added(): T[] {
    return this.addedSelection.selected;
  }

  get removed(): T[] {
    return this.removedSelection.selected;
  }

  set multiple(isMultiple: boolean) {
    const {added, removed} = this.format();
    this.initSelection(isMultiple, added, removed);
  }

  get multiple(): boolean {
    return this.isMultiple;
  }

  get all(): boolean {
    return this._all;
  }

  toJSON(): KalSelection<T> {
    return this.format();
  }

  format(): KalSelection<T> {
    return {
      numberOfItems: this.numberOfItems,
      added: this.added,
      removed: this.removed,
      all: this.all,
      numberOfSelectedItems: this.total,
      multiple: this.multiple
    };
  }

  get changes(): Observable<KalSelection<T>> {
    return this.changes$.asObservable();
  }

}
