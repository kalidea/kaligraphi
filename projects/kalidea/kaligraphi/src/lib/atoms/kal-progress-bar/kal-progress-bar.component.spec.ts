import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KalProgressBarComponent } from './kal-progress-bar.component';

describe('KalProgressBarComponent', () => {
  let component: KalProgressBarComponent;
  let fixture: ComponentFixture<KalProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalProgressBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalProgressBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the progress-bar color according to a CSS class', () => {

  });

  it('should have a default progress value', () => {
    const progressBar = fixture.debugElement.query(By.css('div'));
    component.value = 40;

    // update view
    fixture.detectChanges();

    expect(progressBar.styles.width).toEqual(component.value + '%');
  });

  it('should clamp value between 0 and 100', () => {
    component.value = 50;
    expect(component.value).toBe(50);

    component.value = 999;
    expect(component.value).toBe(100);

    component.value = -10;
    expect(component.value).toBe(0);
  });
});
