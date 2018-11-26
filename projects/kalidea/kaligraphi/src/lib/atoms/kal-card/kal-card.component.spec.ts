import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalCardComponent } from './kal-card.component';

describe('KalCardComponent', () => {
  let component: KalCardComponent;
  let fixture: ComponentFixture<KalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
