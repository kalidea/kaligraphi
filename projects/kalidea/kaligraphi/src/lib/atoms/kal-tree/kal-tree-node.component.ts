import { Component, Input } from '@angular/core';

@Component({
  selector: 'kal-tree-node',
  templateUrl: './kal-tree-node.component.html'
})
export class KalTreeNodeComponent<T> {
  @Input() node: T;
}
