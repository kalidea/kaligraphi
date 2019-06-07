import { OnInit, Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-select-virtual-scroll',
  templateUrl: './select-virtual-scroll.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectVirtualScrollComponent implements OnInit {

  options: { id: number, label: string }[] = [];

  constructor() {
  }

  buildOptions() {
    this.options = [];
    for (let i = 0; i < 500; i++) {
      this.options.push({ id : i, label: `option : ${i}`});
    }
  }

  ngOnInit() {
    this.buildOptions();
  }
}
