import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-card',
  templateUrl: './kal-card.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
