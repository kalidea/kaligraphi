import { Component, Directive, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { KalThemeDirective } from './kal-theme.directive';

@Component({
  selector: 'kal-test',
  template: `
    <div #div [kalTheme]="themes">plop</div>
  `
})
export class TestComponent {
  themes: string|string[] = '';

  @ViewChild('div', {static: true}) div: ElementRef;
}

describe('KalThemeDirective', () => {

  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule
      ],
      declarations: [TestComponent, KalThemeDirective]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const contains = (...classes): boolean => {
    const classList: DOMTokenList = component.div.nativeElement.classList;
    return classes.every(c => classList.contains(KalThemeDirective.prefix + c));
  };

  it('should compute single class with string', () => {
    component.themes = 'primary';
    fixture.detectChanges();
    expect(contains('primary')).toBeTruthy();
  });

  it('should compute multiple class with string', () => {
    component.themes = 'primary, large reverse';
    fixture.detectChanges();
    expect(contains('primary', 'large', 'reverse')).toBeTruthy();
  });

  it('should compute multiple class with array', () => {
    component.themes = ['primary', 'default', 'reverse'];
    fixture.detectChanges();
    expect(contains('primary', 'default', 'reverse')).toBeTruthy();
  });

  it('should remove old present theme when assigning new', () => {
    component.themes = ['primary', 'reverse'];
    fixture.detectChanges();
    component.themes = ['secondary'];
    fixture.detectChanges();
    const message = ` class list ${component.div.nativeElement.classList} should not contain primary/reverse`;
    expect(contains('primary', 'reverse')).toBeFalsy(message);
  });
});
