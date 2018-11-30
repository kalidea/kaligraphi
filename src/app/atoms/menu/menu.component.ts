import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

  themes = [];

  constructor() { }


  get reverse() {
    return this.themes.some(t => t === 'reverse');
  }

  selected($event) {
    console.log('selected', $event);
  }


  ngOnInit() {
  }

}
