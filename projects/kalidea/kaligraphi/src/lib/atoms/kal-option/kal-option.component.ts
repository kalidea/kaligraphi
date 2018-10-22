import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'kal-option',
  templateUrl: './kal-option.component.html',
  styleUrls: ['./kal-option.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionComponent implements OnInit {

  @Input() id: any;

  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();



  constructor(private _element: ElementRef<HTMLElement>) {
  }

  emitSelectionChangeEvent(): void {
    this.selectionChange.emit(this);
  }

  get viewValue(): string {
    return (this._element.nativeElement.textContent || '').trim();
  }

  ngOnInit() {
  }

}
