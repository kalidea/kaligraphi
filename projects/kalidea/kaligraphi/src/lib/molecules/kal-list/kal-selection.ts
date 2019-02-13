import { SelectionModel } from '@angular/cdk/collections';
import { isNil, cloneDeep } from 'lodash';

type KalListSelectionStore = 'included' | 'excluded';

export class KalListSelection<T extends { id: string }> {

  constructor(public selected: T[] = [], public all: boolean = false, public excluded: T[] = [], public totalElement: number) {
  }

  /**
   * get number of selected items
   */
  get total() {
    return this.all ? this.totalElement - this.excluded.length : this.selected.length;
  }

  reset() {
    this.selected = [];
    this.excluded = [];
  }

  add(item: T, store: KalListSelectionStore = 'included') {
    (store === 'included' ? this.selected : this.excluded).push(item);
  }

  remove(item: T, store: KalListSelectionStore = 'included') {
    (store === 'included' ? this.selected : this.excluded).splice(this.indexOf(item, store), 1);
  }

  indexOf(item: T, store: KalListSelectionStore = 'included'): number {
    return (store === 'included' ? this.selected : this.excluded).findIndex(element => element.id === item.id);
  }

  contains(item: T, store: KalListSelectionStore = 'included') {
    return this.indexOf(item, store) !== -1 || (this.all && this.excluded.findIndex(element => element.id === item.id) === -1);
  }

}

export class KalSelection<T extends {id?: string}> {

  count ? = 0; // Total of elements

  added?: T[] = []; // List of added elements

  removed?: T[] = []; // List of removed elements

  all ? = false; // Check if all items are selected

  multiple ? = false;
}

class SubSelectionModel<T extends {id?: string}> extends SelectionModel<T> {

  getItem(item: T): T {
    if (!isNil(item.id)) {
      return this.selected.find(element => !!('' + element.id === '' + item.id));
    } else {
      return item;
    }
  }

  isSelected(item: T): boolean {

    if (!isNil(item.id)) {
      item = this.getItem(item) || item;
    }

    return super.isSelected(item);
  }

  // isSelected(item: T): boolean {
  //   if (!isNil(item.id)) {
  //     return this.selected.some(element => '' + element.id === '' + item.id);
  //   } else {
  //     this.selected.some(element => element === item);
  //   }
  // }

  select(item: T): void {
    if (!this.isSelected(item)) {
      super.select(item);
    }
  }

  deselect(item: T): void {
    item = this.getItem(item);

    if (item) {
      super.deselect(item);
    }
  }

}

export class KalSelectionModel<T extends {id?: string}> extends SelectionModel<T> {

  private added: SelectionModel<T>;

  private removed: SelectionModel<T>;

  count = 0;

  private all = false;

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

    // this.added = new SelectionModel<T>(multiple, added as T[], true);
    this.added = new SubSelectionModel<T>(multiple, added as T[], true);
    // this.removed = new SelectionModel<T>(multiple, removed as T[], true);
    this.removed = new SubSelectionModel<T>(multiple, removed as T[], true);
    this.all = all;
    this.count = count;
  }

  /**
   * get number of selected items
   */
  get total() {
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

  format() {
    return {
      added: this.added.selected,
      removed: this.removed.selected,
      all: this.all,
      count: this.count,
      total: this.total
    };
  }

  changes() {
  }

}
