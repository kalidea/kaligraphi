import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-progress-bar',
  templateUrl: './kal-progress-bar.component.html',
  styleUrls: ['./kal-progress-bar.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalProgressBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
