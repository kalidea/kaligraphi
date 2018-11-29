import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-rater',
  templateUrl: './rater.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RaterComponent implements OnInit {

  iconName = 'star';

  maxRate = 5;

  control: FormControl;

  constructor() {
  }

  /**
   * Display current rating value
   */
  displayRating(): number {
    return this.control.value;
  }

  ngOnInit() {
    // init rating with a default value of 2
    this.control = new FormControl(2);
  }

}
