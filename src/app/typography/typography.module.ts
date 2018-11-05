import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { TextComponent } from 'src/app/typography/text/text.component';
import { TypographyRoutingModule } from 'src/app/typography/typography-routing.module';

@NgModule({
  imports: [
    CommonModule,
    KaligraphiModule,
    TypographyRoutingModule
  ],
  declarations: [
    TextComponent
  ]
})
export class TypographyModule { }
