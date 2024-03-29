import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { KalFormFieldComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.component';
import { KalFormFieldModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-form-field/kal-form-field.module';
import { KalInputModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-input/kal-input.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-form-field>
      <kal-input [label]="label" [required]="required" [id]="for"></kal-input>
    </kal-form-field>
  `
})
export class TestComponent {
  label = 'first field';

  required = false;

  for = 'best_id_ever';
}

describe('KalFormFieldComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule],
      declarations: [TestComponent]
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

  it('should update label', () => {
    const label = 'First input';
    component.label = label;
    fixture.detectChanges();
    const labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement).toBeDefined();
    expect(labelElement.nativeElement.textContent.trim()).toEqual(label);
  });

  it('should update required', () => {
    component.required = true;
    fixture.detectChanges();
    const requiredElement = fixture.debugElement.query(By.css('label'));
    expect(requiredElement).toBeDefined();
    expect(requiredElement.nativeElement.textContent.trim()).toBeTruthy();
  });

  it('should update for', () => {
    const id = 'better_id';
    component.for = id;
    fixture.detectChanges();
    const requiredElement: HTMLElement = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(requiredElement).toBeDefined();
    expect(requiredElement.getAttribute('for')).toEqual(id);
  });


});

/*****************************************************************/
/****************************** Reactive forms ************************/
/*****************************************************************/

// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-test',
  template: `
    <kal-form-field>
      <kal-input [formControl]="inputCtrl"></kal-input>
    </kal-form-field>
  `
})
export class Test2Component {
  @ViewChild(KalFormFieldComponent, {static: true})
  formField: KalFormFieldComponent;

  inputCtrl = new UntypedFormControl('', [Validators.email, Validators.required]);
}

describe('KalFormFieldComponent Reactive form', () => {
  let component: Test2Component;
  let fixture: ComponentFixture<Test2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule, ReactiveFormsModule],
      declarations: [Test2Component]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Test2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('shoud detect required validator', () => {
    expect(component.formField.required).toBeTruthy();
  });

  it('should not show error if field is pristine', () => {
    const wrapper = (fixture.debugElement.nativeElement as HTMLElement).querySelector('.kal-form-field__wrapper');

    expect(component.inputCtrl.pristine).toBeTruthy();
    expect(wrapper.classList.contains('kal-form-field--error')).toBeFalsy('should not add error class on pristine');

    const event = new KeyboardEvent('input', {key: '2'});
    const input = (fixture.nativeElement as HTMLElement).querySelector('input');
    input.value = '2';
    input.dispatchEvent(event);
    component.inputCtrl.updateValueAndValidity();
    fixture.detectChanges();

    expect(component.inputCtrl.dirty).toBeTruthy();
    expect(wrapper.classList.contains('kal-form-field--error')).toBeTruthy('should add error class on pristine');
  });
});

/*****************************************************************/
/****************************** INCEPTION ************************/
/*****************************************************************/

// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-inception1',
  template: `
    <kal-form-field>
      <kal-form-field>
        <kal-input [formControl]="inputCtrl"></kal-input>
      </kal-form-field>
    </kal-form-field>
  `
})
export class InceptionComponent {
  @ViewChild(KalFormFieldComponent, {static: true})
  formField: KalFormFieldComponent;

  inputCtrl = new UntypedFormControl('', [Validators.email, Validators.required]);
}

describe('KalFormFieldComponent Inception', () => {
  let component: InceptionComponent;
  let fixture: ComponentFixture<InceptionComponent>;
  let spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule, ReactiveFormsModule],
      declarations: [InceptionComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    spy = spyOn(console, 'warn');
    fixture = TestBed.createComponent(InceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should raise a warning when form-field in form-field', () => {
    expect(spy).toHaveBeenCalledOnceWith(KalFormFieldComponent.formFieldInFormFieldError);
  });
});

// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-inception2',
  template: `
    <kal-form-field>
      <kal-test></kal-test>
    </kal-form-field>
  `
})
export class Inception2Component {
  @ViewChild(KalFormFieldComponent, {static: true})
  formField: KalFormFieldComponent;
  inputCtrl = new UntypedFormControl('', [Validators.email, Validators.required]);
}

describe('KalFormFieldComponent Inception2', () => {
  let component: Inception2Component;
  let fixture: ComponentFixture<Inception2Component>;
  let spy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule, ReactiveFormsModule],
      declarations: [Inception2Component, TestComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    spy = spyOn(console, 'warn');
    fixture = TestBed.createComponent(Inception2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should raise a warning when form-field in form-field', () => {
    expect(spy).toHaveBeenCalledOnceWith(KalFormFieldComponent.formFieldInFormFieldError);
  });
});


/*************************************************************************/
/****************************** REQUIRED ASTERISK ************************/
/*************************************************************************/

// eslint-disable-next-line max-classes-per-file
@Component({
  selector: 'kal-test',
  template: `
    <kal-form-field id="first">
      <ng-template kalFormFieldLabel>{{ label }}</ng-template>
      <kal-input [formControl]="inputCtrl"></kal-input>
    </kal-form-field>

    <kal-form-field id="second">
      <kal-input [formControl]="inputCtrl" [label]="label"></kal-input>
    </kal-form-field>
  `
})
export class RequiredAsteriskInLabelComponent {
  label = 'my label';

  inputCtrl = new UntypedFormControl('', [Validators.email, Validators.required]);
}

describe('KalFormFieldComponent Inception', () => {
  let component: RequiredAsteriskInLabelComponent;
  let fixture: ComponentFixture<RequiredAsteriskInLabelComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [KalFormFieldModule, KalInputModule, ReactiveFormsModule],
      declarations: [RequiredAsteriskInLabelComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredAsteriskInLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display an asterisk on all labels when required', () => {
    const check = selector => {
      const labelElement = fixture.debugElement.query(By.css(`${selector} label`));
      expect(labelElement).toBeDefined();
      expect(labelElement.classes['kal-form-field--required']).toBeTruthy('missing classe required on label ' + selector);
    };

    check('#first');
    check('#second');

  });
});
