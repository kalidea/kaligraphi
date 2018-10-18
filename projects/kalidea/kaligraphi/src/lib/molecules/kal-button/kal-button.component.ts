import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-button',
  templateUrl: './kal-button.component.html',
  styleUrls: ['./kal-button.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
