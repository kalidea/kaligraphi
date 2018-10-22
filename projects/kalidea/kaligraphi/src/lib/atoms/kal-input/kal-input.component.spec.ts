import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';

import { KalInputComponent } from './kal-input.component';
import { KalIconModule } from '../kal-icon/kal-icon.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-input
      [formControl]="inputControl"
      [type]="type"
      [placeholder]="placeholder"></kal-input>
  `
})
class TestComponent {
  placeholder = 'plop';

  inputControl: FormControl = new FormControl();

  type = 'text';

  @ViewChild(KalInputComponent) inputComponent: KalInputComponent;

  constructor() {
  }

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
      expect(value).toBe(2.2, 'emited value should be formatted in number');
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
      expect(value).toBe(12, 'emited value should be formatted in number');
      // component.inputComponent.focusOut();
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
      expect(value).toBe(0, 'emited value should be formatted in number');
      // component.inputComponent.focusOut();
      expect(component.inputComponent.value).toBe('0,00', 'user input should be formatted');
      done();
    });
    component.value = userInput;
  }));


  it('format phone number on patch value', ((done) => {
    component.type = 'phone';
    fixture.detectChanges();

    const userInput = '03 83838383';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(value).toBe('0383838383', 'emited value should be unformatted');
      expect(component.inputComponent.value).toBe('03 83 83 83 83', 'user input should be formatted');
      done();
    });
    component.value = userInput;
  }));

  it('should manage max - min limiter for number', (done) => {
    component.inputComponent.type = 'number';
    component.inputComponent.max = 4;
    const userInput = '5';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(value).toBe(4, 'emited value should max value');
      done();
    });
    component.value = userInput;

  });

  it('should manage min limiter for number', (done) => {
    component.inputComponent.type = 'number';
    component.inputComponent.min = 4;
    const userInput = '3';
    component.valueChanges.pipe(take(1)).subscribe(value => {
      expect(value).toBe(4, 'emited value should be min value');
      done();
    });
    component.value = userInput;
  });

  it('should add an icon to clear field', () => {
    component.inputComponent.clearable = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('kal-icon'))).toBeTruthy();
  });

  fit('should count chars if text and max setted', () => {
    component.inputComponent.type = 'text';
    component.inputComponent.max = 4;
    fixture.detectChanges();
    component.value = 'sdfsdfsdf';
  });
});
