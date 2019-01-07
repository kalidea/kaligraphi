import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { KalFormFieldComponent } from './kal-form-field.component';
import { KalFormFieldModule } from './kal-form-field.module';
import { KalInputModule } from '../../atoms/kal-input/kal-input.module';

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

fdescribe('KalFormFieldComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
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
    const required = true;
    component.required = required;
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
