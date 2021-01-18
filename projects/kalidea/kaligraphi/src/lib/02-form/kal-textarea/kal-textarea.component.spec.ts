import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { KalTextareaComponent } from './kal-textarea.component';
import { KalTextareaModule } from './kal-textarea.module';
import { createDuplicateIdTest } from '../../utils/forms/form-element.spec';

describe('KalTextareaComponent', () => {
  let component: KalTextareaComponent;
  let fixture: ComponentFixture<KalTextareaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [
        KalTextareaComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

createDuplicateIdTest('kal-textarea', KalTextareaComponent, [KalTextareaModule]);
