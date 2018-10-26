import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkPortalOutlet, TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'kal-tab-header',
  templateUrl: './kal-tab-header.component.html',
  styleUrls: ['./kal-tab-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabHeaderComponent implements OnInit, AfterViewInit {

  /**
   * The label of the header
   */
  @Input() label = '';

  /**
   * If the label contains icons, we need to use the templateLabel
   */
  @Input() templateLabel: TemplatePortal<any> = null;

  /**
   * Is the header selected
   */
  private isSelected = false;

  /**
   * Is the header disabled
   */
  private isDisabled = false;

  /**
   * The reference to the cdk portal outlet
   */
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Is the header disabled
   */
  @Input()
  get disabled() {
    return this.isDisabled;
  }

  set disabled(value: boolean) {
    this.isDisabled = value;
    this.cdr.markForCheck();
  }

  /**
   * Is the header selected
   */
  @Input()
  get selected() {
    return this.isSelected;
  }

  set selected(value: boolean) {
    this.isSelected = coerceBooleanProperty(value);
    this.cdr.markForCheck();
  }

  ngOnInit() {
    this.cdr.markForCheck();
  }

  ngAfterViewInit() {
    this.attachTemplatePortal();
  }

  /**
   * Attach a template portal
   */
  private attachTemplatePortal() {
    if (this.templateLabel) {
      this.portalOutlet.attachTemplatePortal(this.templateLabel);
      this.cdr.detectChanges();
    }
  }

}
