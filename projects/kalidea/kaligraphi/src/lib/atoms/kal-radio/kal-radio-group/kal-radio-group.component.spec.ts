import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalRadioGroupComponent } from './kal-radio-group.component';

describe('KalRadioGroupComponent', () => {
  let component: KalRadioGroupComponent;
  let fixture: ComponentFixture<KalRadioGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        KalRadioGroupComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalRadioGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
