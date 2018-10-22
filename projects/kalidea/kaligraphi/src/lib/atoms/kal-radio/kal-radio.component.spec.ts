import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { KalRadioModule } from './kal-radio.module';

@Component({
  template: `
  <kal-radio-group>
    <kal-radio value="TEST1">
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

class TestRadioGroupComponent {
}

describe('Radio buttons inside a group', () => {
  let component: TestRadioGroupComponent;
  let fixture: ComponentFixture<TestRadioGroupComponent>;
  // let groupInstance;
  // let radioInstances: KalRadioComponent[];
  // let groupDebugElement;
  // let radioDebugElements: DebugElement[];
  // let radiosList;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalRadioModule
      ],
      declarations: [
        TestRadioGroupComponent,
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRadioGroupComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    // groupDebugElement = fixture.debugElement.query(By.directive(KalRadioGroupComponent));
    //
    // groupInstance = groupDebugElement.injector.get(KalRadioGroupComponent);
    // radioInstances = radioDebugElements.map(debugEl => debugEl.componentInstance);
    //
    // radioDebugElements = fixture.debugElement.queryAll(By.directive(KalRadioComponent));

    // radiosList = fixture.debugElement.queryAll(By.css('input[type=radio]'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display all radios buttons that contains in radio group', () => {
  //   expect(radiosList.length).toEqual(3);
  // });

  // it('should contains checkbox element', () => {
  //   expect(radiosList.length).toEqual(0);
  //
  //   component.radiosList = [
  //     'TEST 1',
  //     'TEST 2',
  //     'TEST 3',
  //   ];
  //
  //   expect(radiosList.length).toEqual(3);
  // });
  //
  // it('should have a form control with a true value', () => {
  //   expect(component.control.value).toBeFalsy();
  //
  //   checkbox.nativeElement.click();
  //
  //   expect(component.control.value).toBeTruthy();
  // });
  //
  // it('should have the formControl value to true', () => {
  //   component.value = false;
  //   component.ngOnInit();
  //
  //   expect(component.control.value).toBeFalsy();
  //
  //   component.value = true;
  //   component.ngOnInit();
  //
  //   expect(component.control.value).toBeTruthy();
  // });
  //
  // it('should emit an event with the form control value when the value changes', () => {
  //   const spyNotif = spyOn(FormElementComponent.prototype, 'notifyUpdate');
  //   spyOn(component.valueChange, 'emit');
  //
  //   component.control.patchValue(true);
  //
  //   expect(spyNotif).toHaveBeenCalledWith(true);
  //   expect(component.valueChange.emit).toHaveBeenCalledWith(true);
  // });
  // it('should update the form control value when a new value is set', () => {
  //   expect(component.control.value).toBeFalsy();
  //
  //   component.writeValue(true);
  //
  //   expect(component.control.value).toBeTruthy();
  // });
  //
  // it('should set the disabled state with formControl', () => {
  //   expect(component.control.disabled).toBeFalsy();
  //
  //   component.setDisabledState(true);
  //
  //   expect(component.control.disabled).toBeTruthy();
  //
  //   component.setDisabledState(false);
  //
  //   expect(component.control.disabled).toBeFalsy();
  // });

});
