import { Directive, HostListener } from '@angular/core';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { KalTreeNode } from '../classes/kal-tree-node';

@Directive({
  selector: '[kalTreeNodeToggle]'
})
export class KalTreeNodeToggleDirective extends CdkTreeNodeToggle<KalTreeNode> {

  @HostListener('click', ['$event'])
  _toggle(event: Event): void {
    super._toggle(event);
  }

}
