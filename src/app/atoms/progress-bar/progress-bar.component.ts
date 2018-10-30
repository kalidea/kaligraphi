import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {

  progressBarValue = 25;
  progressBarColor = '';

  setValue($event): void {
    this.progressBarValue = $event.target.value;
  }

  setColor($event) {
    this.progressBarColor = $event.target.value;
  }
}
