#TAB PANEL

##PURPOSE

####With label

```html
<kal-tab-group>

  <kal-tab label="Header 1" selected>
    Body 1
  </kal-tab>
  
  <kal-tab label="Header 2" disabled>
    Body 2
  <kal-tab>
  
  <kal-tab label="Header 3">
    Body 3
  <kal-tab>

</kal-tab-group>
```

####With template label

```html
<kal-tab-group [formControl]="formControl">

  <kal-tab selected>
    <ng-template kalTabLabel>
      <kal-icon>
        done
      </kal-icon>
      Header 1
    </ng-template>
    Content 1
  </kal-tab>

  <kal-tab>
    <ng-template kalTabLabel>
      <kal-icon>
        done
      </kal-icon>
      Header 2
    </ng-template>
    Content 2
  </kal-tab>

  <kal-tab>
    <ng-template kalTabLabel>
      <kal-icon>
        done
      </kal-icon>
      Header 3
    </ng-template>
    Content 3
  </kal-tab>

</kal-tab-group>

<kal-button (click)="changeTab()">Change tab</kal-button>

```


```typescript
class Test {

  formControl = new FormControl(2);

  constructor() {
  }

  changeTab() {
    this.formControl.patchValue(1);
  }
}
```

##SPECIFICATIONS

* Should display tab according to the ng-content
* Should don't allow click on the disabled tabs
* Should select the default tab
* Should emit the selected tab when clicked
