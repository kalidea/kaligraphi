import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalSelectVirtualScrollComponent } from './kal-select-virtual-scroll.component';

describe('KalSelectVirtualScrollComponent', () => {
  let component: KalSelectVirtualScrollComponent;
  let fixture: ComponentFixture<KalSelectVirtualScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalSelectVirtualScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalSelectVirtualScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
