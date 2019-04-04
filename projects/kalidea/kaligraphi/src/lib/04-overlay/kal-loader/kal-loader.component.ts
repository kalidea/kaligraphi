import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { KalLoaderData } from './kal-loader-data';

@Component({
  selector: 'kal-loader',
  template: `<div>{{ message }}</div><div></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalLoaderComponent {

  message: string;

  constructor(private readonly data: KalLoaderData) {
    this.message = this.data.message;
  }

}
