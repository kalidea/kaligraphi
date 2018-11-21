import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { merge, Subscription } from 'rxjs';

import { KalOptionComponent } from '../kal-option/kal-option.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Component({
  selector: 'kal-menu',
  template: `
    <ng-template>
      <div
        class="kal-menu__content"
        (click)="handleMouse($event)"
        role="menu">
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class KalMenuComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;


  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'> =
    new EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'>();

  @Output() readonly selectionChange = new  EventEmitter<KalOptionComponent>();

  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  @AutoUnsubscribe()
  private tabSubscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private selectionSubscription: Subscription = Subscription.EMPTY;

  constructor(
    public elementRef: ElementRef
  ) {
  }

  get activeItem(): KalOptionComponent {
    return this.keyManager.activeItem;
  }

  handleMouse(event: MouseEvent) {
    this.closed.emit('click');
  }

  handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;

    switch (keyCode) {
      case ESCAPE:
        this.closed.emit('keydown');
        break;
      case SPACE:
      case ENTER:
        if (this.activeItem) {
          this.activeItem.emitSelectionEvent();
        }
        this.closed.emit('pick');
        break;
      default:
        if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
          this.keyManager.onKeydown(event);
          event.stopPropagation();
        }
    }
  }

  setFirstItemActive() {
    this.keyManager.setFirstItemActive();
  }

  /**
   * reset key manager to remove previously selected option
   */
  resetKeyManager() {
    this.keyManager.setActiveItem(-1);
  }

  ngAfterContentInit() {
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.options)
      .withWrap()
      .withVerticalOrientation()
      .withTypeAhead();
    this.tabSubscription = this.keyManager.tabOut.subscribe(() => this.closed.emit('tab'));

    // watch for selection and close this dropdown
    this.selectionSubscription = merge<KalOptionComponent>(...this.options.map(option => option.selectionChange))
      .subscribe(
        (value) => {
          this.selectionChange.emit(value);
          this.closed.emit();
        }
      );
  }

  ngOnDestroy(): void {
    this.closed.complete();
  }


}
