#LIST

##PURPOSE

```html
<kal-list [datasource]="datasource"
          [groupByFunction]="groupByFunction"
          (selectionChange)="selectRow($event)">

<ng-template kalListItem let-item="item">
  {{ item.name }}
</ng-template>

</kal-list>

```

```typescript
class Test {

  datasource = new DataSource();
  
  groupByFunction = (item) => item['name'].charAt(0).toLocaleUpperCase();
  
  selectRow($event) {
  }
  
  constructor() {
  }

}

class DataSource {
  constructor() {
  }
  
  connect(): {item: {name: string}}[] {
    return [{item: {name: 'test'}}];
  }
  
  disconnect() {
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
