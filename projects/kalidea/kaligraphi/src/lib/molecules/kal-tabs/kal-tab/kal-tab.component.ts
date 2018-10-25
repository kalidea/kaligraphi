import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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

  /**
   * Label of the header
   */
  @Input() label = '';

  /**
   * The reference to the template portal
   */
  @ViewChild('tabContent') tabContent: TemplatePortal<any>;

  /**
   * Is a tab selected
   */
  private selectedTab = false;

  /**
   * Is a tab disabled
   */
  private isDisabled = false;

  constructor() {
  }

  /**
   * Is the tab disabled
   */
  @Input()
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  /**
   * Is the tab selected
   */
  @Input()
  get selected(): boolean {
    return this.selectedTab;
  }

  set selected(value: boolean) {
    this.selectedTab = coerceBooleanProperty(value);
  }

  /**
   * Return the content of the tab
   */
  get content(): TemplatePortal<any> {
    return this.tabContent;
  }

  ngOnInit() {
  }
}
