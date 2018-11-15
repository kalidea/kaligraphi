import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Overlay } from '@angular/cdk/overlay';

import { KalIconModule } from '../../../atoms/kal-icon/kal-icon.module';

import { KalDatepickerHeaderComponent } from './kal-datepicker-header.component';
import { KalDatepickerComponent } from '../kal-datepicker.component';

describe('KalDatepickerHeaderComponent', () => {
  let component: KalDatepickerHeaderComponent;
  let fixture: ComponentFixture<KalDatepickerHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        KalIconModule,
      ],
      declarations: [
        KalDatepickerHeaderComponent
      ],
      providers: [
        Overlay,
        KalDatepickerComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalDatepickerHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
