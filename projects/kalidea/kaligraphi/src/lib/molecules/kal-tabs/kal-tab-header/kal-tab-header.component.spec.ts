import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalTabHeaderComponent } from './kal-tab-header.component';

describe('KalTabHeaderComponent', () => {
  let component: KalTabHeaderComponent;
  let fixture: ComponentFixture<KalTabHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalTabHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
