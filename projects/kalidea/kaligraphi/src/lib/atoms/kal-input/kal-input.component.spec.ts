import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { KalInputComponent } from './kal-input.component';
import { KalIconComponent, KalIconModule } from '../kal-icon/kal-icon.module';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

  it('format number on patch value', ((done) => {
    component.type = 'number';
    fixture.detectChanges();

    const userInput = '2,2';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(component.inputComponent.value).toBe(userInput, 'user input should be untouched');
      done();
    });
    component.value = userInput;
  }));

  it('format currency on patch value', ((done) => {
    component.type = 'currency';
    fixture.detectChanges();

    const userInput = '12.0';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(component.inputComponent.value).toBe('12,00', 'user input should be formatted');
      done();
    });
    component.value = userInput;
  }));

  it('format currency on patch value with wrong value', ((done) => {
    component.type = 'currency';
    fixture.detectChanges();

    const userInput = '12a';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(component.inputComponent.value).toBe('12,00', 'user input should be formatted');
      done();
    });
    component.value = userInput;
  }));


  it('format phone number on patch value', ((done) => {
    component.type = 'phone';
    fixture.detectChanges();

    const userInput = '03 83838383';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(component.inputComponent.value).toBe('03 83 83 83 83', 'user input should be formatted');
      done();
    });
    component.value = userInput;
  }));

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
