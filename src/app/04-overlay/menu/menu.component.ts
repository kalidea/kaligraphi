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

  optionsList = ['Option 1', 'Option 2', 'Option 3'];

  constructor() { }


  get reverse(): boolean {
    return this.themes.some(t => t === 'reverse');
  }

  updateOptions(): void {
    this.optionsList = ['Option A', 'Option B', 'Option C'];
  }

  selected($event): void {
    console.log('selected', $event);
  }


  ngOnInit(): void {
  }

}
