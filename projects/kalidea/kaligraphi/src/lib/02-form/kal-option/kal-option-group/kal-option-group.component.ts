import { ChangeDetectionStrategy, Component, Input, OnDestroy, ViewEncapsulation, } from '@angular/core';
import { Coerce } from '../../../utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'kal-option-group',
  templateUrl: './kal-option-group.component.html',
  styleUrls: ['./kal-option-group.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionGroupComponent implements OnDestroy {

  @Input() label: string;

  private _disabled$ = new BehaviorSubject<boolean>(false);

  get disabled$(): Observable<boolean> {
    return this._disabled$.asObservable();
  }

  get disabled(): boolean {
    return this._disabled$.value;
  }

  @Coerce('boolean')
  @Input()
  set disabled(v) {
    this._disabled$.next(v);
  }

  ngOnDestroy() {
    this._disabled$.complete();
  }

}
