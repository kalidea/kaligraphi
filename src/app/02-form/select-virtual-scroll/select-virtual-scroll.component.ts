import { OnInit, Component, ViewEncapsulation, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { KalSelectVirtualScrollComponent } from 'projects/kalidea/kaligraphi/src/lib/02-form/kal-select-virtual-scroll/kal-select-virtual-scroll.component';

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
