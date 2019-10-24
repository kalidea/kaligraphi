import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';

import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { Coerce } from '../../utils/decorators/coerce';

@Component({
  selector: 'kal-textarea',
  templateUrl: './kal-textarea.component.html',
  styleUrls: ['./kal-textarea.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalTextareaComponent)
})
export class KalTextareaComponent extends FormElementComponent<string> implements OnDestroy, AfterContentInit {

  @AutoUnsubscribe()
  subscription: Subscription = Subscription.EMPTY;

  @ViewChild('textarea', {static: true}) textarea: ElementRef<HTMLTextAreaElement>;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector) {
    super();
  }

  private _disabled = false;

  @Input()
  @Coerce('boolean')
  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;

    if (this.control) {
      this.setDisabledState(this._disabled);
    }
  }

  /**
   * @inheritDoc
   */
  writeValue(value: string) {
    if (this.control) {
      this.control.patchValue(value, {emitEvent: false});
      this.cdr.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    // ngControl for formControl does not contain `control` on ngOnInit
    this.control = this.createControlAndSubscriptions(this.injector);

    this.subscription = this.control.valueChanges.subscribe(
      value => {
        this.notifyUpdate(value);
      }
    );

    if (this._disabled) {
      this.setDisabledState(this._disabled);
    }

  }

  ngOnDestroy() {
  }

}
