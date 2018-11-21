import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isArray } from 'util';

@Directive({
  selector: '[kalTheme]'
})
export class KalThemeDirective {

  static readonly prefix = 'kal-theme--';

  private classesList: string[] = [];

  public rawThemes: string | string[];

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
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

    this.classesList = (<string[]>themes)
      .filter(theme => theme !== '')
      .map(theme => KalThemeDirective.prefix + theme);

    this.classesList.forEach(className => {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      });
  }

  /**
   * retrieve themes
   */
  get classes(): string[] {
    return this.classesList;
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
