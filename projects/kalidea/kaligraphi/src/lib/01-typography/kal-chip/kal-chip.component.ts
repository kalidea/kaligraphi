import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'kal-chip',
  template: `
    <div>
      <ng-content></ng-content>
    </div>
    <kal-icon (click)="iconClicked()">clear</kal-icon>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalChipComponent implements OnDestroy {

  @Output() dismiss: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  /**
   * triggered when icon is clicked
   */
  iconClicked() {
    this.dismiss.emit();
  }

  ngOnDestroy(): void {
    this.dismiss.complete();
  }

}
