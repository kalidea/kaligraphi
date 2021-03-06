import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component } from '@angular/core';

import { KalChipComponent } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-chip/kal-chip.component';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';
import { KalChipModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-chip/kal-chip.module';

@Component({
  selector: 'kal-test',
  template: `
    <kal-chip (dismiss)="dismiss()">{{ label }}</kal-chip>
  `
})
class TestComponent {
  label = 'john doe';

  dismiss() {

  }
}

describe('KalChipComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [KalIconModule, KalChipModule]
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
    expect(fixture.nativeElement.querySelector('kal-chip div').textContent).toEqual(component.label);
  });

  it('should emit event when click on kal-icon', () => {
    const spy = spyOn(component, 'dismiss');
    fixture.nativeElement.querySelector('kal-chip kal-icon').click();
    expect(spy).toHaveBeenCalled();
  });
});
