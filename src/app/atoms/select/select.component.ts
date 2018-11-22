import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {

  formControl = new FormControl('OPTION 3');
  formControl2 = new FormControl(['OPTION 3', 'OPTION 1']);

  list = [];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {


    const ob = new Observable((observer) => {
      // Get the next and error callbacks. These will be passed in when
      // the consumer subscribes.

      observer.next();


    });

    ob.pipe(delay(5000)).subscribe(() => {
      this.list = ['OPTION 1', 'OPTION 2', 'OPTION 3', 'OPTION 4', 'OPTION 5'];
      this.cdr.markForCheck();
    });

  }
}
