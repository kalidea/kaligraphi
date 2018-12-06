type KalListSelectionStore = 'selected' | 'excluded';

export class KalListSelection<T extends { id: string }> {

  constructor(public selected: T[] = [], public all: boolean = false, public excluded: T[] = []) {
  }

  reset() {
    this.selected = [];
    this.excluded = [];
  }

  add(item: T, store: KalListSelectionStore = 'selected') {
    (store === 'selected' ? this.selected : this.excluded).push(item);
  }

  remove(item: T, store: KalListSelectionStore = 'selected') {
    (store === 'selected' ? this.selected : this.excluded).splice(this.indexOf(item, store), 1);
  }

  indexOf(item: T, store: KalListSelectionStore = 'selected'): number {
    return (store === 'selected' ? this.selected : this.excluded).findIndex(element => element.id === item.id);
  }

  contains(item: T, store: KalListSelectionStore = 'selected') {
    return this.indexOf(item, store) !== -1 || (this.all && this.excluded.findIndex(element => element.id === item.id) === -1);
  }

}
