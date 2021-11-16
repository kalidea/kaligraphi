import { SelectionModel } from '@angular/cdk/collections';
import { Observable, Subject } from 'rxjs';
import isNil from 'lodash-es/isNil';
import xor from 'lodash-es/xor';

export class KalSelection<T> {

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

// eslint-disable-next-line max-classes-per-file
class SubSelectionModel<T> extends SelectionModel<T> {

  getItem(item: (T & { id?: string })): T {
    if (!isNil(item.id)) {
      return this.selected.find((element: T & { id?: string }) => '' + element.id === '' + item.id);
    } else {
      return item;
    }
  }

  isSelected(item: T): boolean {
    return super.isSelected(this.getItem(item) || item);
  }

  select(...items: T[]): void {
    const filteredItems = items.filter(item => !!item && !this.isSelected(item));
    super.select(...filteredItems);
  }

  deselect(...items: T[]): void {
    const filteredItems = [];

    items.forEach(item => {
      if (item && this.isSelected(item)) {
        filteredItems.push(this.getItem(item));
      }
    });

    super.deselect(...filteredItems);
  }

}

// eslint-disable-next-line max-classes-per-file
export class KalSelectionModel<T> extends SelectionModel<T> {

  numberOfItems = 0;

  private addedSelection: SubSelectionModel<T>;

  private removedSelection: SubSelectionModel<T>;
  private isMultiple = false;
  private readonly changes$: Subject<KalSelection<T>> = new Subject<KalSelection<T>>();

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

  private _all = false;

  get all(): boolean {
    return this._all;
  }

  /**
   * get number of selected items
   */
  get total(): number {
    return this._all ? this.numberOfItems - this.removedSelection.selected.length : this.addedSelection.selected.length;
  }

  get added(): T[] {
    return this.addedSelection.selected;
  }

  get removed(): T[] {
    return this.removedSelection.selected;
  }

  get multiple(): boolean {
    return this.isMultiple;
  }

  set multiple(isMultiple: boolean) {
    const {added, removed} = this.format();
    this.initSelection(isMultiple, added, removed);
  }

  get changes(): Observable<KalSelection<T>> {
    return this.changes$.asObservable();
  }

  private get store(): SelectionModel<T> {
    return this._all ? this.removedSelection : this.addedSelection;
  }

  select(...items: T[]): void;
  select(params: { values: T[]; emitEvent?: boolean }): void;
  select(...params: any): void {
    this.editSelection('select', ...params);
  }

  deselect(...items: T[]): void;
  deselect(params: { values: T[]; emitEvent?: boolean }): void;
  deselect(...params: any): void {
    this.editSelection('deselect', ...params);
  }

  toggle(item: T): void {
    (this._all ? this.removedSelection : this.addedSelection).toggle(item);
    this.changes$.next(this.format());
  }

  selectAll() {
    this.clear({emitEvent: false});
    this._all = true;

    this.changes$.next(this.format());
  }

  clear({emitEvent}: { emitEvent: boolean } = {emitEvent: true}): void {
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

  private editSelection(action: 'select' | 'deselect', ...items: T[]): void;
  private editSelection(action: 'select' | 'deselect', params: { values: T[]; emitEvent?: boolean }): void;
  private editSelection(action: 'select' | 'deselect', ...params: any) {
    if (Array.isArray(params) && params.length === 0) {
      return;
    }

    const actionName = !this._all ? action : xor([action], ['select', 'deselect'])[0];
    const collection: SubSelectionModel<T> = this._all ? this.removedSelection : this.addedSelection;

    const items = params[0]?.values || params;
    const emitEvent = params[0]?.emitEvent ?? true;

    collection[actionName](...items);

    if (emitEvent) {
      this.changes$.next(this.format());
    }
  }

}
