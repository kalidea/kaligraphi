import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { KalLoaderData } from './kal-loader-data';

@Component({
  selector: 'kal-loader',
  template: `
    <div>{{ message }}</div>
    <div></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalLoaderComponent {

  message: string;

  @HostBinding('attr.class')
  _classes = '';

  constructor(private readonly data: KalLoaderData,
              private readonly cdr: ChangeDetectorRef) {
    this.message = this.data.message;
  }

  set classes(classes) {
    this._classes = classes;
    this.cdr.markForCheck();
  }
}
