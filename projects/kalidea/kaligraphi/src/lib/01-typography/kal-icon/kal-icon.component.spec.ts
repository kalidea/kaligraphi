import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Component } from '@angular/core';
import { KalIconModule } from 'projects/kalidea/kaligraphi/src/lib/01-typography/kal-icon/kal-icon.module';

@Component({
  template: `
    <kal-icon>face</kal-icon>
  `
})
class TestKalIconComponent {
}

describe('KalIconComponent', () => {
  let component: TestKalIconComponent;
  let fixture: ComponentFixture<TestKalIconComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        KalIconModule
      ],
      declarations: [
        TestKalIconComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKalIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a material icon according to the given icon name', () => {
    const iconElement = fixture.debugElement.query(By.css('i'));

    // update component view
    fixture.detectChanges();

    expect(iconElement.nativeElement.textContent.trim()).toBe('face');
  });
});
