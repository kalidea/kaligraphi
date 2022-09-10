import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnInit {

  formControl = new UntypedFormControl(2);

  showTab = true;

  constructor() {
  }

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
    'Episode IX – The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }

  changeTab() {
    this.formControl.patchValue((this.formControl.value + 1) % 3);
  }

  toggleTab() {
    this.showTab = !this.showTab;
  }

  ngOnInit() {
  }

}
