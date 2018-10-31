import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DateTime } from 'luxon';
import { FormControl } from '@angular/forms';
import { coerceKalDateProperty, KalDate } from '../../../../projects/kalidea/kaligraphi/src/lib/molecules/kal-datepicker/kal-date';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerComponent implements OnInit {

  date = DateTime.local();

  control = new FormControl(new KalDate('29/05/1289', 'dd/MM/yyyy'));

  constructor() {
  }

  ngOnInit() {
  }

}
