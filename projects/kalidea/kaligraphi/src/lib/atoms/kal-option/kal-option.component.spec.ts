import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalOptionComponent } from './kal-option.component';

describe('KalOptionComponent', () => {
  let component: KalOptionComponent;
  let fixture: ComponentFixture<KalOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
