import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'typography',
    loadChildren: () => import('./01-typography/typography.module').then(m => m.TypographyModule),
  },
  {
    path: 'form',
    loadChildren: () => import('./02-form/form.module').then(m => m.FormModule),
  },
  {
    path: 'layout',
    loadChildren: () => import('./03-layout/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'overlay',
    loadChildren: () => import('./04-overlay/overlay.module').then(m => m.OverlayModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
