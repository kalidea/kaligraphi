import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'typography',
    loadChildren: './01-typography/typography.module#TypographyModule',
  },
  {
    path: 'form',
    loadChildren: './02-form/form.module#FormModule',
  },
  {
    path: 'layout',
    loadChildren: './03-layout/layout.module#LayoutModule',
  },
  {
    path: 'overlay',
    loadChildren: './04-overlay/overlay.module#OverlayModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
