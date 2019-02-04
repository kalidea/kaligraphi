import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'kal-loader',
  template: `
    <p> Chargement en cours </p>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalLoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
