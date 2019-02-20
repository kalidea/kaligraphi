import { SelectionModel } from '@angular/cdk/collections';
import { isNil } from 'lodash';

export class KalSelection<T extends { id?: string }> {

  /**
   * Total of elements in list
   */
  count ? = 0;

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
   * Total of selection
   */
  total ? = 0;
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

  count = 0;

  private added: SubSelectionModel<T>;

  private removed: SubSelectionModel<T>;

  private all = false;

  private isMultiple = false;

  constructor(params?: KalSelection<T>) {
    super();

    // destructure and add default value
    const {
      added,
      all,
      removed,
      count,
      multiple,
    } = {...new KalSelection(), ...params};

    this.initSelection(added.length > 1 || all ? true : multiple, added as T[], removed as T[]);

    this.all = all;
    this.count = count;
  }

  private initSelection(isMultiple: boolean, added: T[], removed: T[]) {
    this.added = new SubSelectionModel<T>(isMultiple, [], true);
    this.removed = new SubSelectionModel<T>(isMultiple, [], true);

    if (isMultiple) {
      this.added.select(...(added as T[]));
      this.removed.select(...(removed as T[]));
    } else if (added.length > 0) {
      this.added.select(added[0] as T);
      this.all = false;
    }

    this.isMultiple = isMultiple;
  }

  /**
   * get number of selected items
   */
  get total(): number {
    return this.all ? this.count - this.removed.selected.length : this.added.selected.length;
  }

  private get store(): SelectionModel<T> {
    return this.all ? this.removed : this.added;
  }

  select(item: T): void {
    this.all ? this.removed.deselect(item) : this.added.select(item);
  }

  deselect(item: T): void {
    this.all ? this.removed.select(item) : this.added.deselect(item);
  }

  toggle(item: T): void {
    this.all ? this.removed.toggle(item) : this.added.toggle(item);
  }

  selectAll() {
    this.clear();
    this.all = true;
  }

  clear(): void {
    this.added.clear();
    this.removed.clear();
    this.all = false;
  }

  isSelected(item: T): boolean {
    return this.all ? !this.removed.isSelected(item) : !!this.added.isSelected(item);
  }

  isEmpty(): boolean {
    return this.all ? this.count === this.removed.selected.length : this.added.isEmpty();
  }

  set multiple(isMultiple: boolean) {
    const {added, removed} = this.format();
    this.initSelection(isMultiple, added, removed);
  }

  get multiple(): boolean {
    return this.isMultiple;
  }

  format(): KalSelection<T> {
    return {
      count: this.count,
      added: this.added.selected,
      removed: this.removed.selected,
      all: this.all,
      total: this.total
    };
  }

}
