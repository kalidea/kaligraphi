import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {

  themes = [];

  dismissable = false;

  actions = true;

  title = 'My title';

  onTitle = 'My on Title';

  constructor() { }

  dismissed(): void {
    console.log('dismissed');
  }

  ngOnInit(): void {
  }

}
