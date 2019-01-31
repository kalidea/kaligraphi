import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { KalCardTitleComponent } from './components/kal-card-title.component';
import { KalCardDismissable } from './components/kal-card-dismissable.class';
import { AutoUnsubscribe } from '../../utils';

@Component({
  selector: 'kal-card',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCardComponent extends KalCardDismissable implements AfterContentInit, OnChanges {

  @ContentChild(KalCardTitleComponent) title: KalCardTitleComponent;

  @AutoUnsubscribe()
  private dismissSubscription = Subscription.EMPTY;

  private updateTitle() {
    if (this.title) {

      // remove previous subscription
      if (!this.dismissSubscription.closed) {
        this.dismissSubscription.unsubscribe();
      }

      // transfer dismissable to title and subscribe to it
      this.title.dismissable = this.dismissable;
      this.dismissSubscription = this.title.dismissed.subscribe(() => this.dismissed.emit());

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

}
