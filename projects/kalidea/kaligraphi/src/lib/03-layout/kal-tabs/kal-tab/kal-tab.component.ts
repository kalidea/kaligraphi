import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  Input,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { KalTabLabelDirective } from '../kal-tab-label.directive';
import { KalTabGroupComponent } from '../kal-tab-group/kal-tab-group.component';

@Component({
  selector: 'kal-tab',
  template: `
    <ng-template cdkPortal #tabContent="cdkPortal">
      <ng-content>
      </ng-content>
    </ng-template>
  `,
  styleUrls: ['./kal-tab.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabComponent {

  /**
   * Label of the header
   */
  @Input()
  get label(): string {
    return this.tabLabel;
  }

  set label(value: string) {
    this.tabLabel = value;
    if (this.tabGroup) {
      this.tabGroup.markForTabGroupCheck();
    }
  }

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

  /**
   * Label of the header
   */
  private tabLabel = '';

  constructor(@Optional() @Inject(forwardRef(() => KalTabGroupComponent)) public tabGroup: KalTabGroupComponent) {
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
