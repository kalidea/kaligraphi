import { Component, ViewEncapsulation } from '@angular/core';
import { KalAutocompleteOption } from '@kalidea/kaligraphi';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent {
  dataSource: KalAutocompleteOption<string>[] = [];

  themes = [];

  result;

  emperors: string[];

  emperorsList = [
    'Charlemagne',
    'Louis XIV the Great',
    'Louis XV the Beloved',
    'Louis XVI the Restorer of French Liberty',
    'Napoleon I',
  ];

  constructor() {
    this.emperors = this.emperorsList;
    this.updateEmperors();
  }


  updateEmperors() {
    this.dataSource = this.emperors.map(name => ({value: name, label: name}));
  }
}
