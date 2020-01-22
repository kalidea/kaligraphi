import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  forwardRef,
  Inject,
  Input,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { KalTabLabelDirective } from '../kal-tab-label.directive';
import { KalTabGroupComponent } from '../kal-tab-group/kal-tab-group.component';
import { KalTabContentDirective } from '../kal-tab-content.directive';

@Component({
  selector: 'kal-tab',
  template: `
    <ng-template>
      <ng-content>
      </ng-content>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabComponent implements OnInit {

  /**
   * Template label of the header
   */
  @ContentChild(KalTabLabelDirective, {static: true}) templateLabel: KalTabLabelDirective;

  /**
   * Template provided in the tab content that will be used if present, used to enable lazy-loading
   */
  @ContentChild(KalTabContentDirective, {read: TemplateRef, static: true}) _explicitContent: TemplateRef<any>;

  /**
   * Template inside the MatTab view that contains an `<ng-content>`.
   */
  @ViewChild(TemplateRef, {static: true}) _implicitContent: TemplateRef<any>;

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

  private _contentPortal: TemplatePortal | null = null;

  constructor(@Optional() @Inject(forwardRef(() => KalTabGroupComponent)) public tabGroup: KalTabGroupComponent,
              private _viewContainerRef: ViewContainerRef) {
  }

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
    return this._contentPortal;
  }

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent, this._viewContainerRef);
  }
}
