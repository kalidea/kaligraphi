import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KAL_DATE_GLOBAL_OPTIONS, KalDateOptions, KaligraphiModule } from '@kalidea/kaligraphi';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OverviewExampleDialogComponent } from 'src/app/dialogs/overview-example-dialog.components';

@NgModule({
  declarations: [
    AppComponent,
    OverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, // for dialog
    AppRoutingModule,
    KaligraphiModule,
  ],
  providers: [
    {
      provide: KAL_DATE_GLOBAL_OPTIONS,
      useValue: {
        parseFormats: ['dd/MM/yyyy', 'ddMMyyyy', 'yy-MM-dd'],
        displayFormat: 'dd/MM/yyyy'
      } as KalDateOptions
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
