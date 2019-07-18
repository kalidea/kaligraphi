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
import { startWith } from 'rxjs/operators';

import { KalOptionComponent } from '../../02-form/kal-option/kal-option.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';

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

  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<any>;

  /** Event emitted when the menu is closed. */
  @Output() readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'> =
    new EventEmitter<void | 'click' | 'keydown' | 'tab' | 'pick'>();

  @Output() readonly selectionChange = new EventEmitter<KalOptionComponent>();

  @AutoUnsubscribe()
  private tabSubscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private selectionSubscription: Subscription = Subscription.EMPTY;

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

  private initOptionsList() {

    // remove previous subscriptions
    this.tabSubscription.unsubscribe();
    this.selectionSubscription.unsubscribe();

    // init key manager
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

  ngAfterContentInit() {
    // set kalMenu theme to overlay content
    if (this.themeDirective) {
      this.theme = this.themeDirective.kalTheme;
    }

    // init event subscription After ContentInit and when options change
    this.options.changes
      .pipe(startWith(1))
      .subscribe(() => this.initOptionsList());

  }

  ngOnDestroy(): void {
    this.closed.complete();
  }


}
