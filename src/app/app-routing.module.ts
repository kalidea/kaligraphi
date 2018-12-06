import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'atoms',
    loadChildren: './atoms/atoms.module#AtomsModule',
  },
  {
    path: 'molecules',
    loadChildren: './molecules/molecules.module#MoleculesModule',
  },
  {
    path: 'typography',
    loadChildren: './typography/typography.module#TypographyModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
