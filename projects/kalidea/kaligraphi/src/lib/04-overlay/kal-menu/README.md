# Menu

## how to use

```html
<span [kalMenuTriggerFor]="menu">
  toggle
</span>

<kal-menu #menu>
  <kal-option (selectionChange)="selected($event)">Option 1</kal-option>
  <kal-option (selectionChange)="selected($event)">Option 2</kal-option>
  <kal-option (selectionChange)="selected($event)">Option 3</kal-option>
</kal-menu>
```

```html
<span [kalMenuTriggerFor]="menu">
  toggle
</span>

<kal-menu #menu (selectionChange)="selected($event)">
  <kal-option>Option 1</kal-option>
  <kal-option>Option 2</kal-option>
  <kal-option>Option 3</kal-option>
</kal-menu>
```




* Should contains checkbox element
* Should have a form control with a true value
* Should have the formControl value to true
* Should coerce the value to a boolean value
* Should emit an event with the form control value when the value changes
* Should update the form control value when a new value is set
