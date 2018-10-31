import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kal-action-row',
  templateUrl: './kal-action-row.component.html',
  styleUrls: ['./kal-action-row.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalActionRowComponent {
}
