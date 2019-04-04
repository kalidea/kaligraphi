import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChipComponent } from 'src/app/01-typography/chip/chip.component';
import { IconComponent } from 'src/app/01-typography/icon/icon.component';
import { TextComponent } from 'src/app/01-typography/text/text.component';

const routes: Routes = [
  {path: 'chip', component: ChipComponent},
  {path: 'icon', component: IconComponent},
  {path: 'text', component: TextComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypographyRoutingModule {
}
