import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DialogComponent } from 'src/app/04-overlay/dialog/dialog.component';
import { LoaderComponent } from 'src/app/04-overlay/loader/loader.component';
import { MenuComponent } from 'src/app/04-overlay/menu/menu.component';
import { SnackbarComponent } from 'src/app/04-overlay/snackbar/snackbar.component';
import { TooltipComponent } from 'src/app/04-overlay/tooltip/tooltip.component';

const routes: Routes = [
  {path: 'dialog', component: DialogComponent},
  {path: 'loader', component: LoaderComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'snackbar', component: SnackbarComponent},
  {path: 'tooltip', component: TooltipComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverlayRoutingModule {
}
