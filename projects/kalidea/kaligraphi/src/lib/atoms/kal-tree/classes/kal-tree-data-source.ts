/**
 * Data source for nested tree.
 *
 * The data source for nested tree doesn't have to consider node flattener, or the way to expand
 * or collapse. The expansion/collapsion will be handled by TreeControl and each non-leaf node.
 */
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class KalTreeDataSource<T> extends DataSource<T> {
  _data = new BehaviorSubject<T[]>([]);

  /**
   * Data for the nested tree
   */
  get data() {
    return this._data.value;
  }

  set data(value: T[]) {
    this._data.next(value);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return merge(...[collectionViewer.viewChange, this._data])
      .pipe(map(() => {
        return this.data;
      }));
  }

  disconnect() {
    // no op
  }
}
