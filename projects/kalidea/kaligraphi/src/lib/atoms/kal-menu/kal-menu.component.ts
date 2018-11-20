import { Component, ContentChildren, ElementRef, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { KalOptionComponent } from '../kal-option/kal-option.component';

@Component({
  selector: 'kal-menu',
  template: `
    <ng-template>
      <div
        class="kal-menu__content"
        tabindex="-1"
        role="menu">
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class KalMenuComponent {
  @ContentChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor(
    public elementRef: ElementRef,
  ) {
  }

}
