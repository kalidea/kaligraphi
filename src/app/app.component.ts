import { Component } from '@angular/core';
import { KalMenuItem } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  items: KalMenuItem[] = [
    {label: 'Home', route: '/'},
    {label: 'Text', route: '/typography/text'},
    {label: 'Input', route: '/atoms/input'},
    {label: 'Checkbox', route: '/atoms/checkbox'},
    {label: 'Radio', route: '/atoms/radio'},
    {label: 'Select', route: '/atoms/select'},
    {label: 'Icon', route: '/atoms/icon'},
    {label: 'Rater', route: '/atoms/rater'},
    {label: 'Progress Bar', route: '/atoms/progress-bar'},
    {label: 'Slider', route: '/atoms/slider'},
    {label: 'List', route: '/molecules/list'},
    {label: 'Tab panel', route: '/molecules/tab-panel'},
    {label: 'Stepper', route: '/molecules/stepper'},
    {label: 'Accordion', route: '/molecules/accordion'},
    {label: 'Dialog', route: '/molecules/dialog'},
    {label: 'Menu', route: '/molecules/menu'},
    {label: 'Form Field', route: '/molecules/form-field'},
    {label: 'Datepicker', route: '/molecules/datepicker'},
  ];
}
