import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { KalMenuItem } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  items: KalMenuItem[];

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
