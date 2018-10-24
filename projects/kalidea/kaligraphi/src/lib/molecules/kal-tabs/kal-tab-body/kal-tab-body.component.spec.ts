import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalTabBodyComponent } from './kal-tab-body.component';

describe('KalTabBodyComponent', () => {
  let component: KalTabBodyComponent;
  let fixture: ComponentFixture<KalTabBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalTabBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTabBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
