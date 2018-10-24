import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalTabComponent } from './kal-tab.component';

describe('KalTabComponent', () => {
  let component: KalTabComponent;
  let fixture: ComponentFixture<KalTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
