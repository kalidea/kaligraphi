import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { KalChipsComponent } from './kal-chips.component';
import { KalIconModule } from '../kal-icon/kal-icon.module';
import { KalChipsModule } from './kal-chips.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-chips (dismiss)="dismiss()">{{ label }}</kal-chips>
  `
})
class TestComponent {
  label = 'john doe';

  dismiss() {

  }
}

describe('KalChipsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [KalIconModule, KalChipsModule]
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

  it('should display content provided', () => {
    component.label = 'plop';
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('kal-chips div').textContent).toEqual(component.label);
  });

  it('should emit event when click on kal-icon', () => {
    const spy = spyOn(component, 'dismiss');
    fixture.nativeElement.querySelector('kal-chips kal-icon').click();
    expect(spy).toHaveBeenCalled();
  });
});
