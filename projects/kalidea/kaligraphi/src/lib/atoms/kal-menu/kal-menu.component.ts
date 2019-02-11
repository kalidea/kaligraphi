import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  Host,
  OnDestroy,
  Optional,
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
import { KalThemeDirective } from '../../utility/directives/kal-theme/kal-theme.directive';

@Component({
  selector: 'kal-menu',
  template: `
    <ng-template>
      <div
        [ngClass]="contentClass"
        [kalTheme]="theme"
        role="menu">
        <ng-content></ng-content>
      </div>
    </ng-template>`
})
export class KalMenuComponent implements AfterContentInit, OnDestroy {

  readonly contentClass = 'kal-menu__content';

  theme: string | string[];

  @ContentChildren(KalOptionComponent) options: QueryList<KalOptionComponent>;

  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'> =
    new EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'>();

  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  constructor(@Optional() @Host() private themeDirective: KalThemeDirective) {
  }

  get activeItem(): KalOptionComponent {
    return this.keyManager.activeItem;
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

  /**
   * reset key manager to remove previously selected option
   */
  resetKeyManager() {
    this.keyManager.setActiveItem(-1);
  }

  ngAfterContentInit() {
    // set kalMenu theme to overlay content
    if (this.themeDirective) {
      this.theme = this.themeDirective.kalTheme;
    }

    // init key manager
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.options)
      .withWrap()
      .withVerticalOrientation()
      .withTypeAhead();
    const tabSubscription = this.keyManager.tabOut.subscribe(() => this.closed.emit('tab'));

    // watch for selection and close this dropdown
    const selectionSubscription = merge<KalOptionComponent>(...this.options.map(option => option.selectionChange))
      .subscribe(
        (value) => {
          this.selectionChange.emit(value);
          this.closed.emit();
        }
      );

    this.subscriptionsList.push(tabSubscription, selectionSubscription);
  }

  ngOnDestroy(): void {
    this.closed.complete();
  }


}
