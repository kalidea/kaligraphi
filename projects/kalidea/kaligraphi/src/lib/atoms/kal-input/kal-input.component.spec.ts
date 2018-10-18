import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalInputComponent } from './kal-input.component';

describe('InputComponent', () => {
  let component: KalInputComponent;
  let fixture: ComponentFixture<KalInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
