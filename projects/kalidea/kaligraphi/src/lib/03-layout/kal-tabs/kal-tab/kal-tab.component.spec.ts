import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PortalModule } from '@angular/cdk/portal';

import { KalTabComponent } from 'projects/kalidea/kaligraphi/src/lib/03-layout/kal-tabs/kal-tab/kal-tab.component';

describe('KalTabComponent', () => {
  let component: KalTabComponent;
  let fixture: ComponentFixture<KalTabComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        PortalModule
      ],
      declarations: [
        KalTabComponent
      ]
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
