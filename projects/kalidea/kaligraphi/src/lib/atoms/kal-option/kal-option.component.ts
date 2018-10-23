import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Highlightable } from '@angular/cdk/a11y';

@Component({
  selector: 'kal-option',
  templateUrl: './kal-option.component.html',
  styleUrls: ['./kal-option.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionComponent implements OnInit, Highlightable {

  @Input() id?: any;
  @Input() value?: any;
  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();

  isHighligh: boolean;
  private isActive: boolean;

  constructor(private _element: ElementRef<HTMLElement>, private cd: ChangeDetectorRef) {
  }

  get active() {
    return this.isActive;
  }

  set active(isActive: boolean) {
    this.isActive = isActive;
  }

  get viewValue(): string {
    return (this._element.nativeElement.textContent || '').trim();
  }

  emitSelectionEvent(): void {
    this.selectionChange.emit(this);
  }

  getLabel(): string {
    return this.viewValue;
  }

  setActiveStyles(): void {
    this.isHighligh = true;
    this.cd.markForCheck();
  }

  setInactiveStyles(): void {
    this.isHighligh = false;
    this.cd.markForCheck();
  }

  ngOnInit() {
  }

}
