import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-textarea',
  templateUrl: './kal-textarea.component.html',
  styleUrls: ['./kal-textarea.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTextareaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
