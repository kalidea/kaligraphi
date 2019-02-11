import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

import { KalButtonComponent } from './kal-button.component';
import { KalButtonModule } from './kal-button.module';

import { KalIconComponent } from '../../atoms/kal-icon/kal-icon.component';

@Component({
  template: `
    <kal-button>Test</kal-button>
  `
})
class TestKalButtonComponent {
}

describe('TestKalButtonComponent', () => {
  let component: TestKalButtonComponent;
  let fixture: ComponentFixture<TestKalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalButtonModule
      ],
      declarations: [
        TestKalButtonComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestKalButtonComponent);
    component = fixture.componentInstance;
  });

  it('should display the content of the button', () => {
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.innerText).toEqual('Test');
  });
});

describe('KalButtonComponent', () => {
  let component: KalButtonComponent;
  let fixture: ComponentFixture<KalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalButtonComponent, KalIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create tabIndex', () => {
    const index = 5;
    component.tabIndex = index;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabIndex).toEqual(index);
  });

  it('should not create tabIndex if disabled', () => {
    const index = 5;
    component.tabIndex = index;
    component.disabled = true;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabindex).toBeUndefined();
  });

});
