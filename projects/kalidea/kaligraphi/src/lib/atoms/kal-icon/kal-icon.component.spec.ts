import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalIconComponent } from './kal-icon.component';

describe('KalIconComponent', () => {
  let component: KalIconComponent;
  let fixture: ComponentFixture<KalIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
