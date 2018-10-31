import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { KalStepLabelDirective } from './kal-step-label.directive';

@Component({
  selector: 'kal-step-header',
  template: `
    <div class="kal-step-header-ripple" ></div>
    <div [class.kal-step-icon]="state !== 'number' || selected"
         [class.kal-step-icon-not-touched]="state == 'number' && !selected"
         [ngSwitch]="state">

    </div>
    <div class="kal-step-label"
         [class.kal-step-label-active]="active"
         [class.kal-step-label-selected]="selected">
      <!-- If there is a label template, use it. -->
      <ng-container *ngIf="templateLabel()" [ngTemplateOutlet]="templateLabel()!.template">
      </ng-container>

    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalStepHeaderComponent implements OnDestroy {
  /** State of the given step. */
  @Input() state: string;

  /** Label of the given step. */
  @Input() label: KalStepLabelDirective | string;

  /** Index of the given step. */
  @Input() index: number;

  /** Whether the given step is selected. */
  @Input() selected: boolean;

  /** Whether the given step label is active. */
  @Input() active: boolean;

  /** Whether the given step is optional. */
  @Input() optional: boolean;

  constructor(
    private focusMonitor: FocusMonitor,
    private element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef) {
    focusMonitor.monitor(element.nativeElement, true);
  }

  /** Returns string label of given step if it is a text label. */
  stringLabel(): string | null {
    return this.label instanceof KalStepLabelDirective ? null : this.label;
  }

  /** Returns MatStepLabel if the label of given step is a template label. */
  templateLabel(): KalStepLabelDirective | null {
    return this.label instanceof KalStepLabelDirective ? this.label : null;
  }

  /** Returns the host HTML element. */
  getHostElement() {
    return this.element.nativeElement;
  }


  focus() {
    this.getHostElement().focus();
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.element.nativeElement);
  }

}
