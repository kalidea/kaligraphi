import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChangeDetectorRef, Component, LOCALE_ID, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  KalIconComponent,
  KalIconModule
} from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import {
  KAL_INPUT_GLOBAL_OPTIONS,
  KalInputComponent,
  KalInputOptions
} from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component';
import { createDuplicateIdTest } from '../../utils/forms/form-element.spec';
import { KalInputModule } from './kal-input.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-input
      #inputChange
      [formControl]="inputControl"
      [type]="type"
      [readonly]="readonly"
      [limit]="limit"
      [icon]="icon"
      [clearable]="clearable"
      [defaultValue]="defaultValue"
      [placeholder]="placeholder"></kal-input>

    <kal-input
      #inputBlur
      [formControl]="inputControlBlur"></kal-input>
  `
})
class TestComponent {

  inputControl: FormControl = new FormControl();

  inputControlBlur: FormControl = new FormControl('', {updateOn: 'blur'});

  limit: number;

  placeholder = 'plop';

  type = 'text';

  icon = 'calendar_today';

  clearable = false;
  readonly = false;

  defaultValue: any = '';

  @ViewChild('inputChange', {static: true}) inputComponent: KalInputComponent;

  @ViewChild('inputBlur', {static: true}) inputComponentBlur: KalInputComponent;


  constructor(private cdr: ChangeDetectorRef) {
  }

  get valueChanges() {
    return this.inputControl.valueChanges;
  }

  get value() {
    return this.inputControl.value;
  }

  set value(value: any) {
    this.inputControl.patchValue(value);
    this.inputControlBlur.patchValue(value, {emitEvent: false});
  }

  patchAndGet(value: any) {
    this.inputControl.patchValue(value);
    this.cdr.markForCheck();
    return this.inputComponent.value + '';
  }
}

describe('KalInputComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let kalInputInstance;

  const getInput = (): HTMLInputElement => {
    return fixture.debugElement.query(By.css('input')).nativeElement;
  };

  beforeAll(() => {
    registerLocaleData(localeFr, 'fr');
  });

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{provide: LOCALE_ID, useValue: 'fr-FR'}],
      imports: [
        ReactiveFormsModule,
        KalIconModule
      ],
      declarations: [TestComponent, KalInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    kalInputInstance = fixture.debugElement.query(By.directive(KalInputComponent)).injector.get(KalInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current value in input', () => {
    const value = '5';
    component.value = value;
    expect(getInput().value).toEqual(value);
  });

  it('should add a placeholder if provided', () => {
    const placeholder = 'JJ/MM/YYYY';
    component.placeholder = placeholder;
    fixture.detectChanges();
    expect(getInput().getAttribute('placeholder')).toEqual(placeholder);
  });

  it('should format [type=number] on patch value', () => {
    component.type = 'number';
    fixture.detectChanges();
    const userInput = '2,2';
    expect(component.inputComponent.formater.toUser(userInput)).toBe(userInput, 'user input should be untouched');

  });

  it('should use defaultValue (0) for [type=number] on patch value ', () => {
    component.type = 'number';

    // replace '' / undefined / null
    component.defaultValue = '0';
    fixture.detectChanges();
    ['', undefined, null].forEach(v => expect(component.patchAndGet(v)).toBe(component.defaultValue, `for value ${v}`));

  });

  it('should use defaultValue (true) for [type=number] on patch value ', fakeAsync(() => {
    component.type = 'number';

    component.defaultValue = 'true';
    fixture.detectChanges();
    ['', null].forEach(v => {
      expect(component.patchAndGet(v)).toBe(component.defaultValue, `for value ${v}`);
    });
  }));

 it('should let initial value for [type=number] on patch value ', () => {
    component.type = 'number';

    component.defaultValue = undefined;
    // detect once before patching the value to have the writeValue method working as expected
    fixture.detectChanges();

    component.inputControl.patchValue('');
    fixture.detectChanges();
    expect(component.inputComponent.control.value).toBe('', '\'\' value should not be formatted when nullable');

    component.inputControl.patchValue(null);
    fixture.detectChanges();
    expect(component.inputComponent.control.value).toBe(null, 'null value should not be formatted when nullable');
  });

  it('should format [type=currency] on patch value', () => {

    // set type before patch value to update to formatter
    component.type = 'currency';
    fixture.detectChanges();

    // round up
    const userInput1 = '12.078';
    component.inputControl.patchValue(userInput1);

    expect(component.inputComponent.formater.toUser(userInput1)).toBe('12,08', ' displayed value should be rounded');
    expect(component.inputComponent.value + '').toEqual('12.08', ' form control value should be rounded');

    // round down
    const userInput2 = '2.522';
    component.inputControl.patchValue(userInput2);

    expect(component.inputComponent.formater.toUser(userInput2)).toBe('2,52', ' displayed value should be rounded');
    expect(component.inputComponent.value + '').toEqual('2.52', ' form control value should be rounded');
  });

  it('format currency on patch value with wrong value', () => {
    component.type = 'currency';
    fixture.detectChanges();

    const userInput = '12a';
    expect(component.inputComponent.formater.toUser(userInput)).toBe('12,00', 'user input should be formatted');
  });

  it('should format [type=phone] on patch value', () => {
    component.type = 'phone';
    fixture.detectChanges();

    expect(component.inputComponent.formater.toUser('03 83838383'))
      .toBe('03 83 83 83 83', 'user input should be formatted');

    expect(component.inputComponent.formater.toUser('0033383838383'))
      .toBe('0033 3 83 83 83 83', 'user input should be formatted');

    expect(component.inputComponent.formater.toUser('+333 838 383 83'))
      .toBe('+33 3 83 83 83 83', 'user input should be formatted');
  });

  it('should add an icon to clear field', () => {
    const text = 'abcdefgh';

    component.inputComponent.clearable = true;

    component.value = text;

    fixture.detectChanges();

    expect(component.inputComponent.value).toEqual(text);

    const icon = fixture.debugElement.query(By.directive(KalIconComponent));

    expect(icon).toBeTruthy();

    icon.nativeElement.click();

    expect(component.inputComponent.value).toEqual('');
  });

  it('should count chars if limit is set', () => {
    const text = 'abcdefgh';
    const max = 10;

    component.limit = max;

    fixture.detectChanges();

    component.value = text;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.counter'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.counter')).nativeElement.textContent.trim()).toEqual(`${text.length} / ${max}`);

    component.value += text;

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.counter')).nativeElement.textContent.trim()).toEqual(`${text.length * 2} / ${max}`);
  });

  it('should display a custom icon', () => {
    const spy = spyOn(kalInputInstance.iconClicked, 'emit');

    const icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));
    expect(icons.length).toEqual(1);

    icons[0].nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not display a custom icon if the field is clearable', () => {
    const spy = spyOn(kalInputInstance, 'clearField');

    component.clearable = true;
    component.icon = null;

    fixture.detectChanges();

    let icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));

    fixture.detectChanges();

    expect(icons.length).toEqual(0);

    component.inputControl.patchValue('test');

    fixture.detectChanges();

    icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));

    expect(icons.length).toEqual(1);

    icons[0].nativeElement.click();

    expect(spy).toHaveBeenCalled();
  });

  it('should not display a custom icon if no icon is provided', () => {
    let icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));
    expect(icons.length).toEqual(1);

    component.icon = null;
    fixture.detectChanges();

    icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));
    expect(icons.length).toEqual(0);
  });

  it('should transfert updateOn property from main control', () => {
    expect(component.inputComponentBlur.control.updateOn).toEqual(component.inputControlBlur.updateOn);
  });
});

describe('KalInputComponent with injected kal-input options', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let kalInputInstance;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: KAL_INPUT_GLOBAL_OPTIONS,
        useValue: {
          clearable: true
        } as KalInputOptions
      }],
      imports: [
        ReactiveFormsModule,
        KalIconModule
      ],
      declarations: [TestComponent, KalInputComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    kalInputInstance = fixture.debugElement.query(By.directive(KalInputComponent)).injector.get(KalInputComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add an attribute readonly to input', () => {
    expect(component.inputComponent.inputElement.nativeElement.hasAttribute('readonly')).toBeFalse();

    component.readonly = true;
    fixture.detectChanges();
    expect(component.inputComponent.inputElement.nativeElement.hasAttribute('readonly')).toBeTrue();

    component.readonly = false;
    fixture.detectChanges();
    expect(component.inputComponent.inputElement.nativeElement.hasAttribute('readonly')).toBeFalse();
  });

  it('should add an icon to clear field', () => {
    const text = 'abcdefgh';

    component.value = text;
    component.clearable = false;
    component.icon = null;

    fixture.detectChanges();

    expect(component.inputComponentBlur.value).toEqual(text);

    const icon = fixture.debugElement.query(By.directive(KalIconComponent));

    expect(icon).toBeTruthy();

    icon.nativeElement.click();

    expect(component.inputComponentBlur.value).toEqual('');
  });

});

createDuplicateIdTest('kal-input', KalInputComponent, [KalInputModule]);
