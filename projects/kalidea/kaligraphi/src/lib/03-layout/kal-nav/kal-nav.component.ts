import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KalNavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'kal-nav',
  exportAs: 'kalNav',
  templateUrl: './kal-nav.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class KalNavComponent implements OnInit {

  /**
   * logo to insert in this menu
   */
  @Input() logo;

  /**
   * nav items list
   */
  @Input() items: KalNavItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
