import { CdkTree } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';

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
export class KalTreeComponent extends CdkTree<KalTreeNode> implements OnInit {
  // Outlets within the tree's template where the dataNodes will be inserted.
  @ViewChild(KalTreeNodeOutletDirective) _nodeOutlet: KalTreeNodeOutletDirective;

  @Output() selectionChanged: EventEmitter<SelectionChange<KalTreeNode>> = new EventEmitter();

  private selection = new SelectionModel(false);

  isSelected(node: KalTreeNode) {
    return this.selection.isSelected(node);
  }

  select(node: KalTreeNode) {
    this.selection.select(node);
  }

  ngOnInit() {
    super.ngOnInit();
    this.selection.changed.subscribe(
      value => {
        this.selectionChanged.emit(value);
      }
    );
  }
}
