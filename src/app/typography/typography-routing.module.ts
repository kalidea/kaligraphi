import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TextComponent } from 'src/app/typography/text/text.component';

const routes: Routes = [
  {path: 'text', component: TextComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyRoutingModule {
}
