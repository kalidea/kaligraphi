import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { KalRadioModule } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.module';
import { KalRadioComponent, KalRadioGroupComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio.component';
import { KalRadioChange } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-radio/kal-radio-change';
import { createDuplicateIdTest } from '../../utils/forms/form-element.spec';

@Component({
  template: `
    <kal-radio-group [formControl]="control">
      <kal-radio value="test1">
        TEST 1
      </kal-radio>
      <kal-radio value="test2">
        TEST 2
      </kal-radio>
      <kal-radio value="test3">
        TEST 3
      </kal-radio>
    </kal-radio-group>
  `
})
class TestRadioGroupWithControlComponent {
  control = new UntypedFormControl('');
}

// eslint-disable-next-line max-classes-per-file
@Component({
  template: `
    <kal-radio-group [value]="value"
                     [disabled]="disabled"
                     (valueChanges)="displayValue($event)">
      <kal-radio value="test1">
        TEST 1
      </kal-radio>
      <kal-radio value="test2">
        TEST 2
      </kal-radio>
      <kal-radio value="test3">
        TEST 3
      </kal-radio>
    </kal-radio-group>
  `
})
class TestRadioGroupWithEventComponent {
  value = '';

  disabled = false;

  displayValue($event: KalRadioChange) {
    this.value = $event.value;
  }
}

describe('Radio buttons inside a group with control', () => {
  let component: TestRadioGroupWithControlComponent;
  let fixture: ComponentFixture<TestRadioGroupWithControlComponent>;
  let groupInstance;
  let radioInstances: KalRadioComponent[];
  let groupDebugElement;
  let radioDebugElements: DebugElement[];
  let radiosList: DebugElement[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        KalRadioModule
      ],
      declarations: [
        TestRadioGroupWithControlComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioGroupWithControlComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(KalRadioGroupComponent));
    groupInstance = groupDebugElement.injector.get(KalRadioGroupComponent);

    radioDebugElements = fixture.debugElement.queryAll(By.directive(KalRadioComponent));
    radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
    radiosList = fixture.debugElement.queryAll(By.css('input[type="radio"]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display all radios buttons that contains in radio group', () => {
    expect(radioDebugElements.length).toEqual(3);
  });

  it('should set all radio button names according to the group name', () => {
    expect(groupDebugElement.name).toBeTruthy();

    radioInstances.forEach(
      radio => {
        expect(radio.name).toEqual(groupInstance.name);
      }
    );
  });

  it('should set a different id for each radio button', () => {
    const radioButtonsId = [];

    radioInstances.forEach(
      radio => {
        radioButtonsId.push(radio.id);
        expect(radio.id).toBeTruthy();
      }
    );

    const isExistingId = radioButtonsId.some((element, index, self) => self.indexOf(element) !== index);

    expect(isExistingId).toBeFalsy();
  });

  it('should set the label position for the radio button group', () => {
    expect(groupInstance.labelPosition).toEqual('after');

    radioInstances.forEach(
      radio => {
        expect(radio.labelPosition).toEqual('after');
      }
    );

    groupInstance.labelPosition = 'before';

    expect(groupInstance.labelPosition).toEqual('before');

    radioInstances.forEach(
      radio => {
        expect(radio.labelPosition).toEqual('before');
      }
    );
  });

  it('should check a radio button', () => {
    let selectedRadioButton = radioInstances.find(radio => radio.checked);

    expect(selectedRadioButton).toBeFalsy();

    component.control.patchValue('test1');

    selectedRadioButton = radioInstances.find(radio => radio.checked);

    expect(selectedRadioButton).toBeTruthy();

  });

  it('should toggle disabled state', () => {
    expect(groupInstance.disabled).toBeFalsy();

    radioInstances.forEach(
      radio => {
        expect(radio.disabled).toBeFalsy();
      }
    );

    component.control.disable();

    expect(groupInstance.disabled).toBeTruthy();
    radioInstances.forEach(
      radio => {
        expect(radio.disabled).toBeTruthy();
      }
    );

    component.control.enable();

    expect(groupInstance.disabled).toBeFalsy();

    radioInstances.forEach(
      radio => {
        expect(radio.disabled).toBeFalsy();
      }
    );
  });

  it('should update form control value when a radio button is clicked', () => {
    expect(component.control.value).toEqual('');

    radiosList[0].nativeElement.click();

    expect(component.control.value).toEqual('test1');

    radiosList[1].nativeElement.click();

    expect(component.control.value).toEqual('test2');

    radiosList[2].nativeElement.click();

    expect(component.control.value).toEqual('test3');
  });

  it('should select a radio button', () => {
    expect(groupInstance.selected).toBeNull();

    component.control.patchValue('test1');

    expect(groupInstance.selected).toEqual(radioInstances[0]);
  });
});

describe('Radio buttons inside a group with event', () => {
  let component: TestRadioGroupWithEventComponent;
  let fixture: ComponentFixture<TestRadioGroupWithEventComponent>;
  let groupInstance;
  let radioInstances: KalRadioComponent[];
  let groupDebugElement;
  let radioDebugElements: DebugElement[];
  let radiosList: DebugElement[];
  let radioLabelsList: DebugElement[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        KalRadioModule
      ],
      declarations: [
        TestRadioGroupWithEventComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioGroupWithEventComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    groupDebugElement = fixture.debugElement.query(By.directive(KalRadioGroupComponent));
    groupInstance = groupDebugElement.injector.get(KalRadioGroupComponent);

    radioDebugElements = fixture.debugElement.queryAll(By.directive(KalRadioComponent));
    radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);

    radiosList = fixture.debugElement.queryAll(By.css('input[type=radio]'));
    radioLabelsList = fixture.debugElement.queryAll(By.css('label'));

  });

  it('should update the group value', () => {
    expect(groupInstance.value).toEqual('');

    radioInstances.forEach(
      radio => {
        expect(radio.checked).toBeFalsy();
      }
    );

    component.value = 'test1';

    fixture.detectChanges();

    expect(groupInstance.value).toEqual('test1');

    const checkedRadio = radioInstances.find(radio => radio.checked);

    expect(checkedRadio).toBeTruthy(groupInstance[0]);
  });

  it('should set the value when a radio button is clicked', () => {
    spyOn(component, 'displayValue');

    expect(groupInstance.value).toEqual('');

    radiosList[0].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[0], 'test1'));

    expect(groupInstance.value).toEqual('test1');

    radiosList[1].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[1], 'test2'));

    expect(groupInstance.value).toEqual('test2');

    radiosList[2].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[2], 'test3'));

    expect(groupInstance.value).toEqual('test3');
  });

  it('should set the value when a radio label is clicked', () => {
    spyOn(component, 'displayValue');

    expect(groupInstance.value).toEqual('');

    radioLabelsList[0].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[0], 'test1'));

    expect(groupInstance.value).toEqual('test1');

    radioLabelsList[1].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[1], 'test2'));

    expect(groupInstance.value).toEqual('test2');

    radioLabelsList[2].nativeElement.click();

    expect(component.displayValue).toHaveBeenCalledWith(new KalRadioChange(radioInstances[2], 'test3'));

    expect(groupInstance.value).toEqual('test3');
  });

  it('should toggle the disabled state', () => {
    expect(groupInstance.disabled).toBeFalsy();

    radioInstances.forEach(radio => {
      expect(radio.disabled).toBeFalsy();
    });

    component.disabled = true;

    fixture.detectChanges();

    expect(groupInstance.disabled).toBeTruthy();

    radioInstances.forEach(radio => {
      expect(radio.disabled).toBeTruthy();
    });
  });

});

createDuplicateIdTest('kal-radio', KalRadioComponent, [KalRadioModule]);
