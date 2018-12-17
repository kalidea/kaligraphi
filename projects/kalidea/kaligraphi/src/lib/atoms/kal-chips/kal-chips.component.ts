import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kal-chips',
  template: `
    <div><ng-content></ng-content></div>
    <kal-icon (click)="iconClicked()">clear</kal-icon>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalChipsComponent implements OnInit, OnDestroy {

  @Output() dismiss: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  /**
   * triggered when icon is clicked
   */
  iconClicked() {
    this.dismiss.emit();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dismiss.complete();
  }

}
