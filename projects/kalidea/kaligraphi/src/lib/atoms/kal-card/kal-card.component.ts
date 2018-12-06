import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChild, OnInit, ViewEncapsulation } from '@angular/core';
import { KalCardTitleComponent } from './components/kal-card-title.component';
import { KalCardDismissable } from './components/kal-card-dismissable.class';
import { AutoUnsubscribe } from '../../utils';


import { Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-card',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCardComponent extends KalCardDismissable implements OnInit, AfterContentInit {

  @ContentChild(KalCardTitleComponent) title: KalCardTitleComponent;

  @AutoUnsubscribe()
  private dismissSubscription = Subscription.EMPTY;

  set dismissable(dismissable: boolean) {
    this._dismissable = coerceBooleanProperty(dismissable);
    if (this.title) {
      this.title.dismissable = dismissable;
    }
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    if (this.title) {
      this.title.dismissable = this.dismissable;
      this.title.dismissed.subscribe(() => this.dismissed.emit());
    }
  }

}
