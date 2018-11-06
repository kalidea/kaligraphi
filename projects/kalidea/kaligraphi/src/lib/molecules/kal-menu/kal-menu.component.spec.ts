import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalMenuComponent } from './kal-menu.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('KalMenuComponent', () => {
  let component: KalMenuComponent;
  let fixture: ComponentFixture<KalMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KalMenuComponent ],
      schemas: [NO_ERRORS_SCHEMA]
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
