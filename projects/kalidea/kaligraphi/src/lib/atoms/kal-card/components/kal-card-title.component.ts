import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KalCardDismissable } from './kal-card-dismissable.class';

@Component({
  selector: 'kal-card-title',
  template: `
    <ng-content></ng-content>
    <kal-button *ngIf="dismissable" class="kal-card-title-close" (click)="iconClicked()">
      <kal-icon>close</kal-icon>
    </kal-button>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCardTitleComponent extends KalCardDismissable implements OnInit {

  iconClicked() {
    this.dismissed.emit();
  }

  ngOnInit() {
  }

}
