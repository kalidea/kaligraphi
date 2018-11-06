#LIST

##PURPOSE

```html
<kal-list [datasource]="datasource"
          [rowTemplate]="rowTemplate"
          [initials]="initials"
          (selectionChange)="selectRow($event)">
</kal-list>

<ng-template #rowTemplate let-item="item">
  {{ item.name }}
</ng-template>
```

```typescript
class Test {

  datasource = new DataSource();
  
  initials = (item) => item['name'].charAt(0).toLocaleUpperCase();
  
  selectRow($event) {
  }
  
  constructor() {
  }

}

class DataSource {
  constructor() {
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
