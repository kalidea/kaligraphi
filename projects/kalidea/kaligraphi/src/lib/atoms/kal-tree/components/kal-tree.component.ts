import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation } from '@angular/core';

import { KalTreeNodeOutletDirective } from '../directives/kal-tree-node-outlet.directive';
import { KalTreeNode } from '../classes/kal-tree-node';

/**
 * Wrapper for the CdkTable with Kaligraphi design styles.
 */
@Component({
  selector: 'kal-tree',
  template: `
    <ng-container kalTreeNodeOutlet></ng-container>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{provide: CdkTree, useExisting: KalTreeComponent}]
})
export class KalTreeComponent extends CdkTree<KalTreeNode> {
  // Outlets within the tree's template where the dataNodes will be inserted.
  @ViewChild(KalTreeNodeOutletDirective) _nodeOutlet: KalTreeNodeOutletDirective;
}
