import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-tab-header',
  templateUrl: './kal-tab-header.component.html',
  styleUrls: ['./kal-tab-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
