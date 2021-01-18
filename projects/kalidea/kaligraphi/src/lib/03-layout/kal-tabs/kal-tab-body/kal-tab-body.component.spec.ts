import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalModule } from '@angular/cdk/portal';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { KalTabBodyComponent } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-body/kal-tab-body.component';
import { KalTabGroupComponent } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab-group/kal-tab-group.component';

describe('KalTabBodyComponent', () => {
  let component: KalTabBodyComponent;
  let fixture: ComponentFixture<KalTabBodyComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PortalModule
      ],
      declarations: [
        KalTabBodyComponent,
        KalTabGroupComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA]
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
