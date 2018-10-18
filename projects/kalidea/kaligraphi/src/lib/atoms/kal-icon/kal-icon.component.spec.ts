import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KalIconComponent } from './kal-icon.component';

describe('KalIconComponent', () => {
  let component: KalIconComponent;
  let fixture: ComponentFixture<KalIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalIconComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a material icon according to the given icon name', () => {
    const iconElement = fixture.debugElement.query(By.css('i'));

    component.fontIcon = 'face';

    // update component view
    fixture.detectChanges();

    expect(iconElement.nativeElement.textContent.trim()).toBe('face');
  });
});
