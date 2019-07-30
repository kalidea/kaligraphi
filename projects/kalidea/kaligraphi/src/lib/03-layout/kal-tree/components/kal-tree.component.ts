import { CdkTree } from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  IterableDiffers,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { SelectionChange } from '@angular/cdk/collections';
import { Subscription } from 'rxjs';

import { KalTreeNodeOutletDirective } from '../directives/kal-tree-node-outlet.directive';
import { KalTreeNode } from '../classes/kal-tree-node';
import { KalTreeControl } from '../classes/kal-tree-control';
import { AutoUnsubscribe } from '../../../utils/decorators/auto-unsubscribe';

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
export class KalTreeComponent extends CdkTree<KalTreeNode> implements OnInit, OnDestroy {
  // Outlets within the tree's template where the dataNodes will be inserted.
  @ViewChild(KalTreeNodeOutletDirective, {static: true}) _nodeOutlet: KalTreeNodeOutletDirective;

  @Output() readonly selectionChanged: EventEmitter<SelectionChange<KalTreeNode>> = new EventEmitter();

  @Input() treeControl: KalTreeControl;

  @AutoUnsubscribe()
  private subscriptions: Subscription = Subscription.EMPTY;

  constructor(differs: IterableDiffers,
              changeDetectorRef: ChangeDetectorRef) {
    super(differs, changeDetectorRef);
  }

  get selection() {
    return this.treeControl.selectionModel;
  }

  ngOnInit() {
    super.ngOnInit();
    this.treeControl.selectionModel.changed
      .subscribe(value => this.selectionChanged.emit(value));
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.selectionChanged.complete();
  }
}
