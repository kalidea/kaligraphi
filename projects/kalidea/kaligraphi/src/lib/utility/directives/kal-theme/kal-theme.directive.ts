import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isArray } from 'util';

@Directive({
  selector: '[kalTheme]'
})
export class KalThemeDirective {

  static readonly prefix = 'kal-theme--';

  public rawThemes: string | string[];

  private themes: string[];

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  get kalTheme() {
    return this.themes;
  }

  @Input()
  set kalTheme(themes: string | string[]) {

    this.rawThemes = themes;

    // remove old theme
    this.removeOldThemes();

    // string
    if (!isArray(themes)) {
      themes = (<string>themes || '').split(/[ ,]+/);
    }

    this.themes = themes as string[];

    this.kalThemeAsClassNames
      .forEach(className => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      });

  }

  get kalThemeAsClassNames(): string[] {
    return (<string[]>this.themes)
      .filter(theme => theme !== '')
      .map(theme => KalThemeDirective.prefix + theme);
  }

  private removeOldThemes() {
    const classList: DOMTokenList = this.elementRef.nativeElement.classList;
    for (let i = 0; i < classList.length; i++) {
      const className = classList.item(i);
      if (new RegExp(KalThemeDirective.prefix).test(className)) {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      }
    }
  }

}
