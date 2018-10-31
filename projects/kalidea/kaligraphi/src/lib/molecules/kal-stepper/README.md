
# STEPPER

# Properties

## @Input
  | Attrib        | Type    | Description                                                                               |
  |---------------|---------|-------------------------------------------------------------------------------------------|
  | linear        | boolean | true if previous step should be valid before going further                                |
  | orientation   | StepperOrientation | 'vertical' / 'horizontaltrue' layout for stepper                                |
  | selectedIndex | number  | index of selected step by default                                                        |

## @Output

| Attrib        | Description                                                                                               |
|---------------|-----------------------------------------------------------------------------------------------------------|
| selectionChange     | Emit when step change|

# Example
```
<kal-stepper [linear]="true" orientation="horizontal" (selectionChange)="selectionUpdated($event)" #stepper>

  <kal-step [stepControl]="firstFormGroup">

    <ng-template kalStepLabel> First step</ng-template>

    <form [formGroup]="firstFormGroup">

      <kal-input formControlName="email"></kal-input>
      <div>
        <button (click)="stepper.next()" [disabled]="firstFormGroup.invalid">Next 1</button>
      </div>
    </form>

  </kal-step>

  <kal-step [stepControl]="secondFormGroup">

    <ng-template kalStepLabel>Second Step</ng-template>

    <form [formGroup]="secondFormGroup">
      <kal-input formControlName="firstname"></kal-input>
      <div>
        <button (click)="stepper.previous()">Previous 2</button>
        <button (click)="stepper.next()">Next 2</button>
      </div>
    </form>

  </kal-step>

  <kal-step>

    <ng-template kalStepLabel>Third Step</ng-template>

    <p>
      Thanks for your subscription
    </p>

    <div>
      <button (click)="stepper.previous()">Previous 3</button>
    </div>

  </kal-step>
</kal-stepper>

```


# Specs
* Should display list of steps
* in linear mode, should prevent going to next step
* Should manage layout direction ( horizontal / vertical )
* Should display current step content
* Should provide ability to going next and previous step
* Should display step when clicking on step header
