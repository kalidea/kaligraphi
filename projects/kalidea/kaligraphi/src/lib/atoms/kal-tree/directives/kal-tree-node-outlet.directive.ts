/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {CdkTreeNodeOutlet} from '@angular/cdk/tree';
import {
  Directive,
  ViewContainerRef,
} from '@angular/core';

/**
 * Outlet for nested CdkNode. Put `[kalTreeNodeOutlet]` on a tag to place children dataNodes
 * inside the outlet.
 */
@Directive({
  selector: '[kalTreeNodeOutlet]'
})
export class KalTreeNodeOutletDirective implements CdkTreeNodeOutlet {
  constructor(public viewContainer: ViewContainerRef) {}
}
