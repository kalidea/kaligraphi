# Purpose

`<kal-datepicker>`  allows users to enter a date either through text input, or by choosing a date from the calendar.

For our purpose, the `<kal-datepicker>` goes from the year 1940 to current year. 

# Usage

`<kal-datepicker>` should be linked to a `formControl`.

```html
<kal-datepicker [formControl]="control"></kal-datepicker>
```

```typescript
control = new FormControl();
```

#### Default value

You can pass a default date to the datepicker. It should be a `KalDate` type. 

If you don't specify a date when instantiating a `KalDate`, the date will be today.
```typescript
control = new FormControl(new KalDate('08/11/2018'));
```

#### Validators

`<kal-datepicker>` works with custom validators that allows us to disable dates.

As you can see bellow, we're disabling dates before `01/12/2018` and after `15/12/2018`. 
```typescript
  // Validators : min date = 01/12/2018 ; max date = 15/12/2018
  control = new FormControl(new KalDate('08/11/2018'), [minDateValidator(new KalDate('01/12/2018')), maxDateValidator(new KalDate('15/12/2018'))]);
  
  export function minDateValidator(minDate: KalDate) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return {'minDate': true};
      }
  
      const minDateTime = minDate.getDate();
      const currentDateTime = (control.value as KalDate).getDate();
      const diffBetweenDates = currentDateTime.diff(minDateTime, ['days']).toObject();
  
      return Math.trunc(diffBetweenDates.days) < 0 ? {'minDate': true} : null;
    };
  }
  
  export function maxDateValidator(maxDate: KalDate) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return {'maxDate': true};
      }
  
      const maxDateTime = maxDate.getDate();
      const currentDateTime = (control.value as KalDate).getDate();
      const diffBetweenDates = currentDateTime.diff(maxDateTime, ['days']).toObject();
  
      return Math.trunc(diffBetweenDates.days) > 0 ? {'maxDate': true} : null;
    };
  }
```
