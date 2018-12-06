import { ChangeDetectionStrategy, Component, HostBinding, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { KAL_SNACKBAR_CONFIG } from './kal-snackbar.injector';
import { KalSnackbarConfig } from './kal-snackbar-config';
import { KalSnackbarService } from './kal-snackbar.service';

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

  private timer;

  constructor(
    @Inject(KAL_SNACKBAR_CONFIG) public config: KalSnackbarConfig,
    private snackbarService: KalSnackbarService) {
  }

  actionClicked() {
    this.config.action.callback();
  }

  ngOnInit() {

    const duration = Math.max(this.config.duration, 1) * 1000;

    this.timer = setTimeout(
      () => {
        this.snackbarService.close(this.config);
      },
      duration
    );
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

}
