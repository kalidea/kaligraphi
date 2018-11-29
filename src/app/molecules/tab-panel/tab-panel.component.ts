import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
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

  constructor() {
  }

  changeTab() {
    this.formControl.patchValue((this.formControl.value + 1) % 3);
  }

  ngOnInit() {
  }

}
