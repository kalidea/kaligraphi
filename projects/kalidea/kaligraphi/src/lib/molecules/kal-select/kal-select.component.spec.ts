import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalSelectComponent } from './kal-select.component';

describe('KalSelectComponent', () => {
  let component: KalSelectComponent;
  let fixture: ComponentFixture<KalSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
