import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';
import { TypographyRoutingModule } from 'src/app/01-typography/typography-routing.module';
import { ChipComponent } from 'src/app/01-typography/chip/chip.component';
import { IconComponent } from 'src/app/01-typography/icon/icon.component';
import { TextComponent } from 'src/app/01-typography/text/text.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TypographyRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    ChipComponent,
    IconComponent,
    TextComponent
  ]
})
export class TypographyModule { }
