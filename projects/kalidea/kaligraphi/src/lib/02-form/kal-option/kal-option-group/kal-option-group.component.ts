import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation, } from '@angular/core';
import { Coerce } from '../../../utils';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'kal-option-group',
  templateUrl: './kal-option-group.component.html',
  styleUrls: ['./kal-option-group.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalOptionGroupComponent {

  @Input() label: string;

  private _disabled$ = new BehaviorSubject<boolean>(false);

  get disabled(): boolean {
    return this._disabled$.value;
  }

  get disabled$(): Observable<boolean> {
    return this._disabled$.asObservable();
  }

  @Coerce('boolean')
  @Input()
  set disabled(v) {
    this._disabled$.next(v);
  }
}
