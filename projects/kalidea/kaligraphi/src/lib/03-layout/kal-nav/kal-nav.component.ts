import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KalNavItem {
  label: string;
  route: string;
}

@Component({
  selector: 'kal-nav',
  templateUrl: './kal-nav.component.html',
  styleUrls: ['./kal-nav.component.sass'],
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
