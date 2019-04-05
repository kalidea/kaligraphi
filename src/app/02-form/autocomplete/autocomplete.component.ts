import { Component, ViewEncapsulation } from '@angular/core';
import { KalAutocompleteOption } from '@kalidea/kaligraphi';
import { FormControl } from '@angular/forms';

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

  control = new FormControl('');

  emperorsList = [
    'Charlemagne',
    'Louis XIV the Great',
    'Louis XV the Beloved',
    'Louis XVI the Restorer of French Liberty',
    'Napoleon I',
  ];

  clearOnPick = false;

  constructor() {
    this.emperors = this.emperorsList;
    this.updateEmperors();
    this.control.valueChanges.subscribe(d => console.log({d}))
  }


  updateEmperors() {
    this.dataSource = this.emperors.map(name => ({value: name, label: name}));
  }

  choicePicked($event) {
    this.result = $event;
  }
}
