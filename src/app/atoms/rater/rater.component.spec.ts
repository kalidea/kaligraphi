import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterComponent } from './rater.component';

describe('RaterComponent', () => {
  let component: RaterComponent;
  let fixture: ComponentFixture<RaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
