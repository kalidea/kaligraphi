import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

import { KalLoaderData } from './kal-loader-data';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';

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

  constructor(private readonly data: KalLoaderData,
              private kalTheme: KalThemeDirective) {
    this.message = this.data.message;
  }

  @HostBinding('class')
  get classes() {
    if (this.kalTheme) {
      return this.kalTheme.kalThemeAsClassNames.join(' ');
    }
  }

}
