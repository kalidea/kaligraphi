import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChipComponent {

  result: string;

  dismiss() {
    this.result = `clicked at ${new Date().getTime()}`;
  }

}
