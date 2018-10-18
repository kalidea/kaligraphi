import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalButtonComponent } from './kal-button.component';

describe('KalButtonComponent', () => {
  let component: KalButtonComponent;
  let fixture: ComponentFixture<KalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
