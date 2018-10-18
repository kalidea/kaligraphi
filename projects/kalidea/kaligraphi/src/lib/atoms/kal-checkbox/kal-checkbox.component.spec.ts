import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalCheckboxComponent } from './kal-checkbox.component';

describe('KalCheckboxComponent', () => {
  let component: KalCheckboxComponent;
  let fixture: ComponentFixture<KalCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
