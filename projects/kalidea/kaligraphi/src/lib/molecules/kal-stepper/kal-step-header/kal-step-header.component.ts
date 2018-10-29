import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { KalStepLabelDirective } from '../directives/kal-step-label.directive';

@Component({
  selector: 'kal-step-header',
  templateUrl: './kal-step-header.component.html',
  styleUrls: ['./kal-step-header.component.sass'],
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
    private _focusMonitor: FocusMonitor,
    private _element: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef) {
    _focusMonitor.monitor(_element.nativeElement, true);
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
    return this._element.nativeElement;
  }


  focus() {
    this.getHostElement().focus();
  }

  ngOnDestroy() {
    this._focusMonitor.stopMonitoring(this._element.nativeElement);
  }

}
