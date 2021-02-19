import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  EventEmitter
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { KAL_SNACKBAR_CONFIG } from './kal-snackbar.injector';
import { KalSnackbarConfig } from './kal-snackbar-config';

@Component({
  selector: 'kal-snackbar',
  templateUrl: './kal-snackbar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateY(+100%)'}),
        animate('200ms ease-in', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave', [
        style({transform: 'translateY(0%)'}),
        animate('200ms ease-in', style({transform: 'translateY(+100%)'}))
      ])
    ])
  ]
})
export class KalSnackbarComponent implements OnInit, OnDestroy {

  @HostBinding('@slideInOut') animation = true;

  @Output() timeEnd = new EventEmitter<KalSnackbarConfig>();

  private timer;

  constructor(@Inject(KAL_SNACKBAR_CONFIG) public config: KalSnackbarConfig) {
  }

  actionClicked() {
    this.config.action.callback();
  }

  ngOnInit() {

    const duration = Math.max(this.config.duration, 1) * 1000;

    this.timer = setTimeout(
      () => {
        this.timeEnd.emit(this.config);
        this.timeEnd.complete();
      },
      duration
    );
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
