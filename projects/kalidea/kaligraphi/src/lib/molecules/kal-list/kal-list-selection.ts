import { SelectionModel } from '@angular/cdk/collections';
import { isNil } from 'lodash';

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

  included?: T[] = []; // List of included elements

  excluded?: T[] = []; // List of excluded elements

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
      return this.selected.some(element => '' + element.id === '' + item.id);
    } else {
      this.selected.some(element => element === item);
    }
  }

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

  private included: SelectionModel<T>;

  private excluded: SelectionModel<T>;

  private count = 0;

  private all = false;

  constructor(params?: KalSelection<T>) {
    super();

    // destructure and add default value
    const {
      included,
      all,
      excluded,
      count,
      multiple,
    } = {...new KalSelection(), ...params};

    this.included = new SubSelectionModel<T>(multiple, included as T[], false);
    this.excluded = new SubSelectionModel<T>(multiple, excluded as T[], false);
    this.all = all;
    this.count = count;

  }

  /**
   * get number of selected items
   */
  get total() {
    return this.all ? this.count - this.excluded.selected.length : this.included.selected.length;
  }

  private get store(): SelectionModel<T> {
    return this.all ? this.excluded : this.included;
  }

  select(item: T): void {
    this.all ? this.excluded.deselect(item) : this.included.select(item);
  }

  deselect(item: T): void {
    this.all ? this.excluded.select(item) : this.included.deselect(item);
  }

  toggle(item: T): void {
    this.all ? this.excluded.toggle(item) : this.included.toggle(item);
  }

  clear(): void {
    this.included.clear();
    this.excluded.clear();
    this.all = false;
  }

  isSelected(item: T): boolean {
    return this.all ? !this.excluded.isSelected(item) : !!this.included.isSelected(item);
  }

  isEmpty(): boolean {
    return this.all ? this.count === this.excluded.selected.length : this.included.isEmpty();
  }

  format() {
    return {
      added: this.included.selected,
      removed: this.excluded.selected,
      all: this.all,
      count: this.count
    };
  }

  changes() {
  }

}
