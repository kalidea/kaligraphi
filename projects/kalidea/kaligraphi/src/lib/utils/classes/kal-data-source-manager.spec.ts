import { KalDataSourceManager } from './kal-data-source-manager';
import { DataSource, CollectionViewer, ListRange } from '@angular/cdk/collections';
import { Observable, timer, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';


class MockDataSource extends DataSource<any> {

  connected = false;

  constructor() {
    super();
  }

  connect(): Observable<any[]> {
    this.connected = true;
    return observableData();
  }

  disconnect() {
    this.connected = false;
  }
}

class MockView implements CollectionViewer {
  viewChange: Observable<ListRange>;
  constructor() {}
}

const arrayDataSource = () => [1, 2, 3, 4, 5];
const observableData = () => of(arrayDataSource()).pipe(delay(100));

describe('KalDataSourceManager', () => {
  let subscription: Subscription;
  beforeEach( () => {
    subscription = Subscription.EMPTY;
  });

  afterEach(() => {
    subscription.unsubscribe();
  });

  it('should create an instance', () => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    expect(dataSourceManager).toBeTruthy();
  });

  it('should be able to set and get an observable as dataSource', () => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    const data = observableData();
    dataSourceManager.dataSource = data;
    expect(dataSourceManager.dataSource).toBe(data, 'setting an observable as dataSource');
  });

  it('should be able to set and get an array as dataSource', () => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    const data = arrayDataSource();
    dataSourceManager.dataSource = data;
    expect(dataSourceManager.dataSource).toBe(data, 'setting an array as dataSource');
  });

  it('should be able to set and get DataSource object as dataSource', () => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    const dataSource = new MockDataSource();
    dataSourceManager.dataSource = dataSource;
    expect(dataSourceManager.dataSource).toBe(dataSource, 'setting a DataSource as dataSource');
  });

  it('should subscribe to an empty datasource', (done) => {
    const dataSourceManager = new KalDataSourceManager<number>(null);

    subscription = dataSourceManager.observable.subscribe( o => {
      expect(o).toEqual([], 'dataSource is not set');
      done();
    });
  });

  it('should subscribe to an observable datasource', (done) => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    const data = observableData();
    dataSourceManager.dataSource = data;

    subscription = dataSourceManager.observable.subscribe( o => {
      expect(o).toEqual([1, 2, 3, 4, 5]);
      done();
    });
  });


  it('should subscribe to an array datasource', (done) => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    dataSourceManager.dataSource = arrayDataSource();

    subscription = dataSourceManager.observable.subscribe( o => {
      expect(o).toEqual([1, 2, 3, 4, 5]);
      done();
    });
  });


  it('should subscribe to a DataSource object datasource', (done) => {
    const dataSourceManager = new KalDataSourceManager<number>(new MockView());
    const dataSource = new MockDataSource();
    dataSourceManager.dataSource = dataSource;
    expect(dataSource.connected).toBeFalsy();

    subscription = dataSourceManager.observable.subscribe( o => {
      expect(o).toEqual([1, 2, 3, 4, 5]);
      done();
    });
    expect(dataSource.connected).toBeTruthy();
  });

  it('should disconnect DataSource when unsubscribed', () => {
    const dataSourceManager = new KalDataSourceManager<number>(null);
    const data = new MockDataSource();
    dataSourceManager.dataSource = data;

    const sub = dataSourceManager.observable.subscribe( o => {
      expect(o).toEqual([], );
    });
    expect(data.connected).toBeTruthy();
    sub.unsubscribe();
    expect(sub.closed).toBeTruthy();
    expect(data.connected).toBeFalsy('should disconnect the DataSource');
  });

});
