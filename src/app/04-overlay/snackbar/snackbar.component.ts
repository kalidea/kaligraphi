import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KalSnackbarConfig, KalSnackbarService } from '@kalidea/kaligraphi';

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

  duration = 4;

  constructor(private snackbarService: KalSnackbarService) {
  }

  addSnackbar() {
    const config = new KalSnackbarConfig({
      title: this.title,
      duration: this.duration
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
