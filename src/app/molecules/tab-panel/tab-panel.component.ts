import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab-panel',
  templateUrl: './tab-panel.component.html',
  styleUrls: ['./tab-panel.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPanelComponent implements OnInit {

  formControl = new FormControl(2);

  showTab = true;

  constructor() {
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
