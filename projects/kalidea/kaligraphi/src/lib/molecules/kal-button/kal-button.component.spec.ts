import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KalButtonComponent } from './kal-button.component';
import { By } from '@angular/platform-browser';

describe('KalButtonComponent', () => {
  let component: KalButtonComponent;
  let fixture: ComponentFixture<KalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalButtonComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on clic', () => {

    const spy = spyOn(component.clicked, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spy).toHaveBeenCalled();

  });

  it('should display provided label', () => {
    const label = 'click me';
    component.label = label;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.innerText).toEqual(label);

  });

  it('should not emit event if disabled', () => {
    component.disabled = true;
    fixture.detectChanges(); // recalcul la vue
    const spy = spyOn(component.clicked, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spy).not.toHaveBeenCalled();

  });

  it('should emit event if not disabled', () => {
    component.disabled = false;
    fixture.detectChanges(); // recalcul la vue
    const spy = spyOn(component.clicked, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spy).toHaveBeenCalled();

  });

  it('should create tabIndex', () => {
    const toto = 5;
    component.tabIndex = toto;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabIndex).toEqual(toto);

  });

  it('should not create tabIndex if disabled', () => {
    const toto = 5;
    component.tabIndex = toto;
    component.disabled = true;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabindex).toBeUndefined();

  });

});
