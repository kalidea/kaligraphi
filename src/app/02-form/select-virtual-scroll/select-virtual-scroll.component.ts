import { OnInit, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-select-virtual-scroll',
  templateUrl: './select-virtual-scroll.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectVirtualScrollComponent implements OnInit {

  options: { id: number, label: string }[] = [];

  themes = [];

  multiple: boolean;

  selection;

  constructor() {
  }

  buildOptions(count: number) {
    this.options = [];
    for (let i = 0; i < count; i++) {
      this.options.push({ id : i, label: `option : ${i}`});
    }
  }

  ngOnInit() {
    this.buildOptions(50);
  }
}
