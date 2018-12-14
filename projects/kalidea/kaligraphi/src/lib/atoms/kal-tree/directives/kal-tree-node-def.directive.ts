import { Directive, Input } from '@angular/core';
import { CdkTreeNodeDef } from '@angular/cdk/tree';

@Directive({
  selector: '[kalTreeNodeDef]',
  providers: [{provide: CdkTreeNodeDef, useExisting: KalTreeNodeDefDirective}]
})
export class KalTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
  @Input() kalTreeNode: T;

  @Input()
  set kalTreeNodeDefWhen(when) {
    this.when = when;
  }
}
