import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KaligraphiModule } from '@kalidea/kaligraphi';

import { AtomsRoutingModule } from 'src/app/atoms/atoms-routing.module';
import { InputComponent } from 'src/app/atoms/input/input.component';
import { SelectComponent } from 'src/app/atoms/select/select.component';
import { CheckboxComponent } from 'src/app/atoms/checkbox/checkbox.component';
import { RadioComponent } from 'src/app/atoms/radio/radio.component';
import { IconComponent } from 'src/app/atoms/icon/icon.component';
import { RaterComponent } from 'src/app/atoms/rater/rater.component';
import { ProgressBarComponent } from 'src/app/atoms/progress-bar/progress-bar.component';
import { SliderComponent } from 'src/app/atoms/slider/slider.component';
import { MenuComponent } from 'src/app/atoms/menu/menu.component';
import { CardComponent } from 'src/app/atoms/card/card.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TreeComponent } from './tree/tree.component';
import { ChipComponent } from './chip/chip.component';
import { LoaderComponent } from './loader/loader.component';
import { CarouselComponent } from './carousel/carousel.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AtomsRoutingModule,
    KaligraphiModule,
  ],
  declarations: [
    InputComponent,
    SelectComponent,
    CheckboxComponent,
    RadioComponent,
    IconComponent,
    RaterComponent,
    ProgressBarComponent,
    SliderComponent,
    MenuComponent,
    SnackbarComponent,
    CardComponent,
    TreeComponent,
    ChipComponent,
    LoaderComponent,
    CarouselComponent,
    LoaderComponent,
    AutocompleteComponent
  ]
})
export class AtomsModule { }
