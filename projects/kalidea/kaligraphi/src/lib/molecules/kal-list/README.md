#LIST

##PURPOSE

#### LIST WITH DATASOURCE

```html
<kal-list [datasource]="datasource"
          [groupByFunction]="groupByFunction"
          [selectionMode]="multiple"
          (selectionChange)="selectRow($event)">

          <ng-template kalListItem let-item="item">
            {{ item.name }}
          </ng-template>

</kal-list>
```

```typescript
class Test {

  datasource = new DataSource();
  
  groupByFunction: (item: {name: string}) => string;
  
  listSelection = new KalListSelection<{id: string}>([{id: '1'}, {id: '2'}]);
  
  selectRow($event) {
  }
  
  constructor() {
    this.groupByFunction = (item: {name: string}) => item.name.charAt(0).toLocaleUpperCase();
  }

}

class DataSource {

  constructor() {
  }
  
  connect(): {item: {name: string}}[] {
    return of([{id: '1', name: 'test 1'}, {id: '2', name: 'test 2'}]);
  }
  
  disconnect() {
  }

}
```

#### list with observable

```html
<kal-list [datasource]="datasource"
          [selectable]="multiple"
          (selectionChange)="selectRow($event)">

          <ng-template kalListItem let-item="item">
            {{ item.name }}
          </ng-template>

</kal-list>
```

```typescript
class Test {

  datasource = of([{id: '1', name: 'test 1'}, {id: '2', name: 'test 2'}]);
  
  constructor() {
  }
  
  selectRow($event) {
  }
}
```

##SPECIFICATIONS

* Disabled a row
* Get number of elements in list
* Display content list
* Custom the template row
* Add initials in list
* Accept datasource
* Select an item
* Return the selected item
