import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KalButtonComponent } from './kal-button.component';
import { KalIconComponent } from './../../atoms/kal-icon/kal-icon.component';


describe('KalButtonComponent', () => {
  let component: KalButtonComponent;
  let fixture: ComponentFixture<KalButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KalButtonComponent, KalIconComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KalButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event on click', () => {

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
    const index = 5;
    component.tabIndex = index;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabIndex).toEqual(index);

  });

  it('should not create tabIndex if disabled', () => {
    const index = 5;
    component.tabIndex = index;
    component.disabled = true;
    fixture.detectChanges(); // recalcul la vue
    const button = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(button.tabindex).toBeUndefined();

  });

  it('should display icon', () => {
    const kalicon = fixture.debugElement.query(By.css('kal-icon'));
    expect(kalicon).toBeFalsy();
    const iconname = 'back';
    component.name = iconname;
    fixture.detectChanges(); // recalcul la vue
    expect(kalicon).toBeDefined();

  });

});
