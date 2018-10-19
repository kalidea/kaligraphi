import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalProgressBarComponent } from './kal-progress-bar.component';

describe('KalProgressBarComponent', () => {
  let component: KalProgressBarComponent;
  let fixture: ComponentFixture<KalProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalProgressBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
