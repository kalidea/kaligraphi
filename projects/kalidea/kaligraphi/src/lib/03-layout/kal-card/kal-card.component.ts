import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { KalCardTitleComponent } from './components/kal-card-title.component';
import { KalCardDismissable } from './components/kal-card-dismissable.class';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Component({
  selector: 'kal-card',
  exportAs: 'kalCard',
  template: `
      <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCardComponent extends KalCardDismissable implements AfterContentInit, OnChanges, OnDestroy {

  @ContentChild(KalCardTitleComponent, {static: false}) kalCardTitleComponent: KalCardTitleComponent;

  @AutoUnsubscribe()
  private dismissSubscription = Subscription.EMPTY;

  private updateTitle() {

    // remove previous subscription even if no title
    if (!this.dismissSubscription.closed) {
      this.dismissSubscription.unsubscribe();
    }

    if (this.kalCardTitleComponent) {
      // transfer dismissable to title and subscribe to it
      this.kalCardTitleComponent.dismissable = this.dismissable;
      this.dismissSubscription = this.kalCardTitleComponent.dismissed.subscribe(() => this.dismissed.emit());

      // update view
      this.cdr.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    this.updateTitle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateTitle();
  }

  ngOnDestroy(): void {
  }

}
