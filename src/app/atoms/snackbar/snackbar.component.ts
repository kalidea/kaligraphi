import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { KalSnackbarService, KalSnackbarConfig } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnackbarComponent implements OnInit {

  title = 'user is saved !';

  actionLabel = 'cancel';

  constructor(private snackbarService: KalSnackbarService) {
  }

  addSnackbar() {
    const config = new KalSnackbarConfig({
      title: this.title,
    });
    if (this.actionLabel) {
      config.action = {
        callback: () => {
          alert('clicked on action');
        },
        label: this.actionLabel
      };
    }

    this.snackbarService.open(config);
  }

  ngOnInit() {
  }

}
