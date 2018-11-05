import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalMenuComponent } from './kal-menu.component';

describe('KalMenuComponent', () => {
  let component: KalMenuComponent;
  let fixture: ComponentFixture<KalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
