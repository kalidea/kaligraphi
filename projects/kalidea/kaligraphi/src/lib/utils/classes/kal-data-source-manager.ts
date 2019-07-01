import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import { Observable, of } from 'rxjs';
import { finalize } from 'rxjs/operators';

type KalDataSource<T> = DataSource<T> | Observable<T[]> | T[];

export class KalDataSourceManager<T> {

  private owner: CollectionViewer;

  constructor( owner: CollectionViewer) {
    this.owner = owner;
  }

  private _dataSource: KalDataSource<T> = null;

  /**
   * Set the Datasource
   * Keep in mind that it does not unsubscribe from the previous DataSource
   */
  set dataSource(dataSource: KalDataSource<T> ) {
    if (this._dataSource !== dataSource) {
      this._dataSource = dataSource;
    }
  }

  /**
   * Returns the dataSource
   */
  get dataSource(): KalDataSource<T> {
    return this._dataSource;
  }

  /**
   * observable generated from the DataSource
   */
  get observable(): Observable<T[] | ReadonlyArray<T>> {
    let observableDataSource: Observable<T[] | ReadonlyArray<T>>;
    if (this._dataSource instanceof Observable) {
      observableDataSource = this._dataSource;
    } else if ( this._dataSource && (this._dataSource as DataSource<T>).connect instanceof Function ) {
      observableDataSource = (this._dataSource as DataSource<T>).connect(this.owner).pipe(
        finalize(() => (this._dataSource as DataSource<T>).disconnect(this.owner))
      );
    } else if (Array.isArray(this._dataSource)) {
      observableDataSource = of(this._dataSource as T[]) as Observable<T[]>;
    } else {
      observableDataSource = of([]);
    }
    return observableDataSource;
  }
}
