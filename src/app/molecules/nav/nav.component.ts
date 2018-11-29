import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { KalNavItem } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-menu',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent implements OnInit {

  items: KalNavItem[];

  constructor() { }

  ngOnInit() {
    this.items = [
      {label: 'home', route: ''},
      {label: 'activity', route: ''},
      {label: 'calendar', route: ''},
      {label: 'contact', route: ''}
    ];
  }

}
