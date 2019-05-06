import { NgModule, Type } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KalLoaderComponent } from './kal-loader.component';
import { KalLoadingDirective } from './kal-loading.directive';
import { KalUtilityModule } from '../../99-utility/kal-utility.module';

export { KalLoaderComponent } from './kal-loader.component';
export { KalLoadingDirective } from './kal-loading.directive';

const exports: Type<any>[] = [
  KalLoaderComponent,
  KalLoadingDirective
];

@NgModule({
  declarations: exports,
  imports: [
    CommonModule,
    KalUtilityModule
  ],
  exports,
  entryComponents: [
    KalLoaderComponent
  ]
})
export class KalLoaderModule {
}
