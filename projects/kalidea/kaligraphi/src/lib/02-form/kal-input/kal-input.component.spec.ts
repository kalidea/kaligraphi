import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, LOCALE_ID, ViewChild } from '@angular/core';
import localeFr from '@angular/common/locales/fr';

import { KalInputComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.component';
import { KalIconComponent, KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'kal-test',
  template: `
    <kal-input
      #inputChange
      [formControl]="inputControl"
      [type]="type"
      [limit]="limit"
      [icon]="icon"
      [clearable]="clearable"
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

  @ViewChild('inputChange') inputComponent: KalInputComponent;

  @ViewChild('inputBlur') inputComponentBlur: KalInputComponent;

  get valueChanges() {
    return this.inputControl.valueChanges;
  }

  get value() {
    return this.inputControl.value;
  }

  set value(value: any) {
    this.inputControl.patchValue(value);
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

  beforeEach(async(() => {
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

  it('format number on patch value', () => {
    component.type = 'number';
    fixture.detectChanges();
    const userInput = '2,2';
    expect(component.inputComponent.formater.toUser(userInput)).toBe(userInput, 'user input should be untouched');

  });

  it('format currency on patch value', () => {
    component.type = 'currency';
    fixture.detectChanges();

    const userInput = '12.0';
    expect(component.inputComponent.formater.toUser(userInput)).toBe('12,00', 'user input should be formatted');
  });

  it('format currency on patch value with wrong value', () => {
    component.type = 'currency';
    fixture.detectChanges();

    const userInput = '12a';
    expect(component.inputComponent.formater.toUser(userInput)).toBe('12,00', 'user input should be formatted');
  });


  it('format phone number on patch value', () => {
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

    fixture.detectChanges();

    component.value = text;

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

    expect(fixture.debugElement.query(By.css('.counter'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('.counter')).nativeElement.textContent.trim()).toEqual(`${text.length} / ${max}`);

    component.value += text;

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
    fixture.detectChanges();

    const icons = fixture.debugElement.queryAll(By.directive(KalIconComponent));
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
