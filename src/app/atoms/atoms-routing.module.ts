import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { SnackbarComponent } from 'src/app/atoms/snackbar/snackbar.component';
import { TreeComponent } from 'src/app/atoms/tree/tree.component';
import { ChipComponent } from 'src/app/atoms/chip/chip.component';
import { LoaderComponent } from 'src/app/atoms/loader/loader.component';
import { CarouselComponent } from 'src/app/atoms/carousel/carousel.component';
import { AutocompleteComponent } from 'src/app/atoms/autocomplete/autocomplete.component';
import { TooltipComponent } from 'src/app/atoms/tooltip/tooltip.component';

const routes: Routes = [
  {path: 'input', component: InputComponent},
  {path: 'select', component: SelectComponent},
  {path: 'checkbox', component: CheckboxComponent},
  {path: 'radio', component: RadioComponent},
  {path: 'icon', component: IconComponent},
  {path: 'rater', component: RaterComponent},
  {path: 'progress-bar', component: ProgressBarComponent},
  {path: 'slider', component: SliderComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'card', component: CardComponent },
  {path: 'snackbar', component: SnackbarComponent},
  {path: 'tree', component: TreeComponent},
  {path: 'chip', component: ChipComponent},
  {path: 'loader', component: LoaderComponent},
  {path: 'carousel', component: CarouselComponent},
  {path: 'autocomplete', component: AutocompleteComponent},
  {path: 'tooltip', component: TooltipComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtomsRoutingModule {
}
