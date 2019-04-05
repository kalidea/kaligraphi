import { Directive, Input } from '@angular/core';
import { CdkTreeNodeDef } from '@angular/cdk/tree';

@Directive({
  selector: '[kalTreeNodeDef]',
  providers: [{provide: CdkTreeNodeDef, useExisting: KalTreeNodeDefDirective}]
})
export class KalTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {

  data: T;

  @Input()
  set kalTreeNode(data: T) {
    this.data = data;
  }

  @Input()
  set kalTreeNodeDefWhen(when) {
    this.when = when;
  }
}
