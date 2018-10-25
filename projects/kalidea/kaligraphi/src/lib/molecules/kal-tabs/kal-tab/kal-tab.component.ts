import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'kal-tab',
  templateUrl: './kal-tab.component.html',
  styleUrls: ['./kal-tab.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabComponent implements OnInit {

  @Input() label = '';

  @ViewChild('tabContent') tabContent: TemplatePortal<any>;

  private selectedTab = false;

  private isDisabled = false;

  constructor() {
  }

  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  @Input()
  get selected(): boolean {
    return this.selectedTab;
  }

  set selected(value: boolean) {
    this.selectedTab = coerceBooleanProperty(value);
  }

  get content(): TemplatePortal<any> {
    return this.tabContent;
  }

  ngOnInit() {
  }
}
