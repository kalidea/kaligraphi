import { AbstractControl, AsyncValidator, ControlValueAccessor } from '@angular/forms';
import { of } from 'rxjs';


/**
 * How To use:
 * 1) create a component
 * 2) extends FormControlAccessComponent
 * 3) provide custom providers build by buildProviders(ComponentName)
 * 4) override validate method if needed
 * 5) call notifyUpdate to notify changes
 *
 *   @Component({
 *     selector: 'app-custom-component',
 *     providers: [buildProviders(CustomComponent)]
 *   })
 *   export class CustomComponent extends FormControlAccessComponent
 */
export abstract class FormControlAccessComponent<T = any> implements ControlValueAccessor, AsyncValidator {

  /**
   * previous value
   */
  protected previousValue: T = null;

  constructor() {
  }

  /**
   * get previous value
   */
  getPreviousValue(): T {
    return this.previousValue;
  }

  /**
   * @inheritDoc
   */
  registerOnChange(fn) {
    this.onChange = fn;
  }

  /**
   * @inheritDoc
   */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  /**
   * @inheritDoc
   */
  writeValue(value) {
    if (value) {
      this.onTouched();
    }
  }

  /**
   * notify update form control
   */
  notifyUpdate(value: T) {
    this.updateValue(value);
  }

  /**
   * @inheritDoc
   */
  validate(c: AbstractControl) {
    return of({});
  }

  /**
   * function called when control is changed
   */
  protected onChange: any = () => {
  };

  /**
   * function called when control is touched
   */
  protected onTouched: any = () => {
  };

  /**
   * compare 2 value of this control and return equality
   * should be implemented in each sub class
   */
  protected valueEquals(value1: T, value2: T) {
    return value1 === value2;
  }

  /**
   * update value
   */
  private updateValue(value: T) {
    this.onChange(value);
    this.onTouched();
    this.previousValue = value;
  }

}
