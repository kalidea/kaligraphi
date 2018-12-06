import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
export class KalCardComponent extends KalCardDismissable implements AfterContentInit {

  @ContentChild(KalCardTitleComponent) title: KalCardTitleComponent;

  @AutoUnsubscribe()
  private dismissSubscription = Subscription.EMPTY;

  set dismissable(dismissable: boolean) {
    this._dismissable = coerceBooleanProperty(dismissable);
    if (this.title) {
      this.title.dismissable = dismissable;
    }
  }

  ngAfterContentInit(): void {
    if (this.title) {
      this.title.dismissable = this.dismissable;
      this.title.dismissed.subscribe(() => this.dismissed.emit());
    }
  }

}
