import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipsComponent {

  result: string;

  dismiss() {
    this.result = `clicked at ${new Date().getTime()}`;
  }

}
