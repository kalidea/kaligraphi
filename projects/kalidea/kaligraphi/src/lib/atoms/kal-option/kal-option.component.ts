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

  @ViewChild('text') textElement: ElementRef;

  constructor() {
  }

  emitSelectionChangeEvent(): void {
    this.selectionChange.emit(this);
  }

  getValueText(): string {
    console.log(this.textElement);
    return this.textElement.nativeElement.value;
  }

  ngOnInit() {
  }

}
