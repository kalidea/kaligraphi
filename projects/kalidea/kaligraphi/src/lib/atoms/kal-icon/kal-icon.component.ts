import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kal-icon',
  templateUrl: './kal-icon.component.html',
  styleUrls: ['./kal-icon.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalIconComponent implements OnInit {

  /**
   * Name of an icon within a font set
   */
  @Input() fontIcon: string;

  constructor() {
  }

  ngOnInit() {
  }

}
