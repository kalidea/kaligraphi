import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KaligraphiModule } from '@kalidea/kaligraphi';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
