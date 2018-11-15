import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { isArray } from 'util';

@Directive({
  selector: '[kalTheme]'
})
export class KalThemeDirective {

  static readonly prefix = 'kal-theme--';

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {
  }

  @Input()
  set kalTheme(themes: string | string[]) {

    // remove old theme
    this.removeOldThemes();

    // string
    if (!isArray(themes)) {
      themes = (<string>themes || '').split(/[ ,]+/);
    }

    (<string[]>themes)
      .filter(theme => theme !== '')
      .forEach(className => {
        this.renderer.addClass(this.elementRef.nativeElement, KalThemeDirective.prefix + className);
      });

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
