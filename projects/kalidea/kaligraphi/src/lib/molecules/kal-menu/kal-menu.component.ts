import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';

export interface KalMenuItem {
  label: string;
  route: string;
}

@Component({
  selector: 'kal-menu',
  templateUrl: './kal-menu.component.html',
  styleUrls: ['./kal-menu.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalMenuComponent implements OnInit {

  /**
   * logo to insert in this menu
   */
  @Input() logo;

  /**
   * nav items list
   */
  @Input() items: KalMenuItem[];

  constructor() {
  }

  ngOnInit() {
  }

}
