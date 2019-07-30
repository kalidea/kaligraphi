import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AutoUnsubscribe, KalAutocompleteOption } from '@kalidea/kaligraphi';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteComponent implements OnDestroy {

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

  @AutoUnsubscribe()
  private subscription = Subscription.EMPTY;

  constructor() {
    this.emperors = this.emperorsList;
    this.updateEmperors();
    this.subscription = this.control.valueChanges.subscribe(d => console.log({d}));
  }

  updateEmperors() {
    this.dataSource = this.emperors.map(name => ({value: name, label: name}));
  }


  choicePicked($event) {
    this.result = $event;
  }

  ngOnDestroy(): void {
  }
}
