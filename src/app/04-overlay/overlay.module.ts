import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { OverlayRoutingModule } from 'src/app/04-overlay/overlay-routing.module';
import { DialogComponent } from 'src/app/04-overlay/dialog/dialog.component';
import { LoaderComponent } from 'src/app/04-overlay/loader/loader.component';
import { MenuComponent } from 'src/app/04-overlay/menu/menu.component';
import { SnackbarComponent } from 'src/app/04-overlay/snackbar/snackbar.component';
import { TooltipComponent } from 'src/app/04-overlay/tooltip/tooltip.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    DialogComponent,
    LoaderComponent,
    MenuComponent,
    SnackbarComponent,
    TooltipComponent
  ]
})
export class OverlayModule { }
