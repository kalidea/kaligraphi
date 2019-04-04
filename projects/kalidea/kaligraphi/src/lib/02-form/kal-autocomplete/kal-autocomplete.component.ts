import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Observable, Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { KalAutocompleteOption } from './kal-autocomplete-option';
import { KalOptionComponent } from '../kal-option/kal-option.component';
import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';

@Component({
  selector: 'kal-autocomplete',
  templateUrl: './kal-autocomplete.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalAutocompleteComponent<T> implements AfterViewInit {

  private selectionSubject = new Subject<KalAutocompleteOption<T>>();

  /**
   * All of the defined select optionsComponent
   */
  @ViewChildren(KalOptionComponent)
  private optionsComponent: QueryList<KalOptionComponent>;

  /**
   * Manages keyboard events for optionsComponent in the panel
   */
  private keyManager: ActiveDescendantKeyManager<KalOptionComponent>;

  /**
   * list of options
   */
  private _options: KalAutocompleteOption<T>[];

  @AutoUnsubscribe()
  private subscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) {
  }

  get options(): KalAutocompleteOption<T>[] {
    return this._options;
  }

  set options(options: KalAutocompleteOption<T>[]) {
    this._options = options;
    this.cdr.markForCheck();
  }

  /**
   * get option selected with keyManager
   */
  get selectedOption(): KalAutocompleteOption<T> {
    return this.keyManager.activeItem ? this.keyManager.activeItem.value : null;
  }

  /**
   * get selection as observable
   */
  get selection$(): Observable<KalAutocompleteOption<T>> {
    return this.selectionSubject.asObservable();
  }

  /**
   * manage keydown for this event
   * do not expose keymanager
   */
  onKeydown(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }

  /**
   * triggered when user is focusing out
   */
  close() {
    this.select(null);
  }

  /**
   * select option
   */
  select(option: KalAutocompleteOption<T>) {
    this.selectionSubject.next(option);
    this.selectionSubject.complete();
  }

  private initKeyManager() {
    this.keyManager = new ActiveDescendantKeyManager<KalOptionComponent>(this.optionsComponent)
      .withVerticalOrientation()
      .withWrap()
      .withTypeAhead(0);
  }

  ngAfterViewInit(): void {
    this.subscription = this.optionsComponent.changes
      .pipe(startWith(0))
      .subscribe(() => {
        this.initKeyManager();
      });

  }
}
