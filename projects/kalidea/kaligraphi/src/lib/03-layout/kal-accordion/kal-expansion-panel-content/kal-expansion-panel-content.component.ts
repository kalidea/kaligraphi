import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kal-expansion-panel-content',
  templateUrl: './kal-expansion-panel-content.component.html',
  styleUrls: ['./kal-expansion-panel-content.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalExpansionPanelContentComponent {
}
