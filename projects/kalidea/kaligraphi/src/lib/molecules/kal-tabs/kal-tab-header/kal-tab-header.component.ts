import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-tab-header',
  templateUrl: './kal-tab-header.component.html',
  styleUrls: ['./kal-tab-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabHeaderComponent implements OnInit {

  @Input() label = '';

  private selectedTab = false;

  private disabledTab = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  @Input()
  get disabled() {
    return this.disabledTab;
  }
  set disabled(value: boolean) {
    this.disabledTab = value;
    this.cdr.markForCheck();
  }

  @Input()
  get selected() {
    return this.selectedTab;
  }

  set selected(value: boolean) {
    this.selectedTab = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.cdr.markForCheck();
  }

}
