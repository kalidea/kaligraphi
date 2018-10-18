import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-icon',
  templateUrl: './kal-icon.component.html',
  styleUrls: ['./kal-icon.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalIconComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
