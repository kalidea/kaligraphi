import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalOptionGroupComponent } from './kal-option-group.component';

describe('KalOptionGroupComponent', () => {
  let component: KalOptionGroupComponent;
  let fixture: ComponentFixture<KalOptionGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalOptionGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalOptionGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
