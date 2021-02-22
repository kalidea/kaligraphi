import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Coerce } from '../../../utils/decorators/coerce';
import { KalTabContentDirective } from '../kal-tab-content.directive';

import { KalTabLabelDirective } from '../kal-tab-label.directive';

@Component({
  selector: 'kal-tab',
  exportAs: 'kalTab',
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
   * Template inside the Tab view that contains an `<ng-content>`.
   */
  @ViewChild(TemplateRef, {static: true}) _implicitContent: TemplateRef<any>;

  @Input() value = null;

  private updateSubject$ = new Subject<void>();
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

  update$ = this.updateSubject$.asObservable().pipe(shareReplay());

  constructor(private _viewContainerRef: ViewContainerRef) {
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
    // notify observer that interface should be redrawed
    this.updateSubject$.next();
  }

  /**
   * Is the tab disabled
   */
  @Input()
  @Coerce('boolean')
  get disabled(): boolean {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = value;
    // notify observer that interface should be redrawed
    this.updateSubject$.next();
  }

  /**
   * Is the tab selected
   */
  @Input()
  @Coerce('boolean')
  get selected(): boolean {
    return this.selectedTab;
  }

  set selected(value: boolean) {
    this.selectedTab = value;
    // notify observer that interface should be redrawed
    this.updateSubject$.next();
  }

  /**
   * Return the content of the tab
   */
  get content(): TemplatePortal<any> {
    return this._contentPortal;
  }

  ngOnInit(): void {
    this._contentPortal = new TemplatePortal(
      this._explicitContent || this._implicitContent,
      this._viewContainerRef
    );
  }

}
