import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs';
import { buildProviders, FormElementComponent } from '../../utils/forms/form-element.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Component({
  selector: 'kal-textarea',
  templateUrl: './kal-textarea.component.html',
  styleUrls: ['./kal-textarea.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalTextareaComponent)
})
export class KalTextareaComponent extends FormElementComponent<string> implements OnDestroy, AfterContentInit {

  /**
   * Subscription of formControl
   */
  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  constructor(private cdr: ChangeDetectorRef,
              private injector: Injector) {
    super();
  }

  /**
   * @inheritDoc
   */
  writeValue(value: string) {
    if (this.superControl) {
      this.superControl.patchValue(value, {emitEvent: false});
      this.cdr.markForCheck();
    }
  }

  ngAfterContentInit(): void {

    // ngControl for formControl does not contain `control` on ngOnInit
    this.createControlAndSubscriptions(this.injector);
  }

  ngOnDestroy() {
  }

}
