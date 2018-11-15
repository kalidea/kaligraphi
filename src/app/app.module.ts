import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KalMenuModule, KaligraphiModule } from '@kalidea/kaligraphi';

import { AppComponent } from 'src/app/app.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { OverviewExampleDialogComponent } from 'src/app/molecules/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewExampleDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    KalMenuModule,
    KaligraphiModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OverviewExampleDialogComponent,
  ],
})
export class AppModule { }
