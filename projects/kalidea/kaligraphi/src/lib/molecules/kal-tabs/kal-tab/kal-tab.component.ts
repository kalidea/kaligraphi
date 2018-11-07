import { ChangeDetectionStrategy, Component, ContentChild, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { KalTabLabelDirective } from '../kal-tab-label.directive';

@Component({
  selector: 'kal-tab',
  templateUrl: './kal-tab.component.html',
  styleUrls: ['./kal-tab.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabComponent {

  /**
   * Label of the header
   */
  @Input() label = '';

  /**
   * Template label of the header
   */
  @ContentChild(KalTabLabelDirective) templateLabel: KalTabLabelDirective;

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
}
