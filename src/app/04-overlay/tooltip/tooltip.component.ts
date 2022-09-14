import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipComponent implements OnInit {

  themes: any;

  reverse: boolean;

  constructor() {
  }

  get hasReverse(): boolean {
    return this.themes ? this.themes.find(t => t === 'reverse') !== undefined : false;
  }

  ngOnInit(): void {
  }

}
