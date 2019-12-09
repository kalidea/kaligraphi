import {Component, ViewEncapsulation} from '@angular/core';
import {KalNavItem} from '@kalidea/kaligraphi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {

  // Typography
  itemsTypography: KalNavItem[] = [
    {label: 'text', route: '/typography/text'},
    {label: 'icon', route: '/typography/icon'},
    {label: 'chip', route: '/typography/chip'},

  ];

  // Form
  itemsForm: KalNavItem[] = [
    {label: 'autocomplete', route: '/form/autocomplete'},
    {label: 'button', route: '/form/button'},
    {label: 'checkbox', route: '/form/checkbox'},
    {label: 'datepicker', route: '/form/datepicker'},
    {label: 'form-field', route: '/form/form-field'},
    {label: 'input', route: '/form/input'},
    {label: 'progress-bar', route: '/form/progress-bar'},
    {label: 'radio', route: '/form/radio'},
    {label: 'rater', route: '/form/rater'},
    {label: 'select', route: '/form/select'},
    {label: 'slider', route: '/form/slider'},
    {label: 'textarea', route: '/form/textarea'},

  ];

  // Layout
  itemsLayout: KalNavItem[] = [
    {label: 'accordion', route: '/layout/accordion'},
    {label: 'card', route: '/layout/card'},
    {label: 'carousel', route: '/layout/carousel'},
    {label: 'list', route: '/layout/list'},
    {label: 'nav', route: '/layout/nav'},
    {label: 'tab-panel', route: '/layout/tab-panel'},
    {label: 'tree', route: '/layout/tree'},
    {label: 'stepper', route: '/layout/stepper'},

  ];

  itemsOverlay: KalNavItem[] = [
    {label: 'loader', route: '/overlay/loader'},
    {label: 'dialog', route: '/overlay/dialog'},
    {label: 'menu', route: '/overlay/menu'},
    {label: 'snackbar', route: '/overlay/snackbar'},
    {label: 'tooltip', route: '/overlay/tooltip'},
  ];

  items = [
    {key: 'Typography', list: this.itemsTypography},
    {key: 'Form', list: this.itemsForm},
    {key: 'Layout', list: this.itemsLayout},
    {key: 'Overlay', list: this.itemsOverlay},
  ];

}
