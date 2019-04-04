import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardComponent implements OnInit {

  dismissable = false;

  actions = true;

  title = 'My title';

  onTitle = 'My on Title';

  constructor() { }

  dismissed() {
    console.log('dismissed');
  }

  ngOnInit() {
  }

}
