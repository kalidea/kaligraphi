import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  HostListener,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOWN_ARROW, ENTER, ESCAPE, SPACE, UP_ARROW } from '@angular/cdk/keycodes';

import { Subscription } from 'rxjs';
import { startWith, take } from 'rxjs/operators';

import { AutoUnsubscribe } from '../../utils/decorators/auto-unsubscribe';
import { KalInputComponent } from '../kal-input/kal-input.component';
import { KalAutocompleteComponent } from './kal-autocomplete.component';
import { KalAutocompleteOption } from './kal-autocomplete-option';
import { KalThemeDirective } from '../../utility/directives/kal-theme/kal-theme.directive';


@Directive({
  selector: 'kal-input[kalAutocomplete]'
})
export class KalAutocompleteDirective<T = string> implements OnDestroy {

  @Output() readonly kalAutocompleteSelected = new EventEmitter<KalAutocompleteOption<T>>();

  /**
   * reference to the overlay created
   */
  private _overlayRef: OverlayRef;

  /**
   * reference to autocomplete component loaded in overlay
   */
  private autocompleteComponent: KalAutocompleteComponent<T>;

  /**
   * datasource for this autocomplete
   */
  private _dataSource: KalAutocompleteOption<T>[];

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  constructor(private readonly overlay: Overlay,
              private readonly input: KalInputComponent,
              private readonly elementRef: ElementRef,
              private readonly viewContainerRef: ViewContainerRef,
              @Optional() @Host() private readonly theme: KalThemeDirective) {
  }

  @Input('kalAutocomplete')
  set dataSource(dataSource: KalAutocompleteOption<T>[]) {
    this._dataSource = dataSource;
  }


  private get positionsList(): FlexibleConnectedPositionStrategy {
    return this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          overlayY: 'top',
          overlayX: 'start',
          originY: 'bottom',
          originX: 'start'
        }
      ]);
  }

  /**
   * get reference of overlayRef and create it if don't exists
   */
  private get overlayRef(): OverlayRef {
    if (!this._overlayRef) {
      const panelClass = this.theme ? this.theme.kalThemeAsClassNames : [''];
      const config: OverlayConfig = {
        positionStrategy: this.positionsList,
        panelClass: panelClass.join(' ')
      };
      this._overlayRef = this.overlay.create(config);

    }
    return this._overlayRef;
  }

  /**
   * Handles all keydown events on the input
   */
  @HostListener('keyup', ['$event'])
  handleKeydown(event: KeyboardEvent): void {

    const {keyCode} = event;

    // on escape, close
    if (keyCode === ESCAPE) {
      this.close();
      return;
    }

    // if overlay is not open
    if (!this._overlayRef || !this.overlayRef.hasAttached()) {
      this.open();
      return;
    }

    if ([DOWN_ARROW, UP_ARROW].indexOf(keyCode) >= 0) {
      // if arrow pressed, use keyManager
      event.preventDefault();
      event.stopPropagation();
      this.autocompleteComponent.onKeydown(event);

    } else if ([SPACE, ENTER].indexOf(keyCode) >= 0) {
      // space or enter, emit selected option
      this.notifySelectionUpdate(this.autocompleteComponent.selectedOption);

    }

  }

  @HostListener('focusin')
  private open() {

    this.close();

    const portal = new ComponentPortal(KalAutocompleteComponent, this.viewContainerRef) as ComponentPortal<KalAutocompleteComponent<T>>;
    this.autocompleteComponent = this.overlayRef.attach(portal).instance;

    // watch for selection change
    const selectionChangeSubscription = this.autocompleteComponent.selection$
      .pipe(take(1))
      .subscribe(selectedOption => {
        this.notifySelectionUpdate(selectedOption);
      });

    // watch for input change
    const valueChangeSubscription = this.input
      .valueChange
      .pipe(startWith(this.input.value))
      .subscribe(filter => {
        this.updateOptionsList(filter);
      });

    this.subscriptionsList.push(selectionChangeSubscription, valueChangeSubscription);
  }

  /**
   * update autocomplete options list according to filter provided
   */
  private updateOptionsList(filter = '') {
    let optionsList = [];
    if (filter.trim() !== '') {
      try {
        const regexp = new RegExp(`.*${filter}.*`, 'i');
        optionsList = this._dataSource.filter(element => regexp.test(element.label));
      } catch (e) {
        optionsList = this._dataSource;
      }
    } else {
      optionsList = this._dataSource;
    }
    this.autocompleteComponent.options = optionsList;
  }

  /**
   * close autocomplete
   */
  private close() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    if (this.subscriptionsList) {
      this.subscriptionsList.forEach(subscription => subscription.unsubscribe());
    }
  }

  /**
   * notify selection was updated
   */
  private notifySelectionUpdate(option: KalAutocompleteOption<T>) {
    this.kalAutocompleteSelected.emit(option);
    if (option) {
      this.input.writeValue(option.label);
    }
    this.close();
  }

  ngOnDestroy() {
    this.kalAutocompleteSelected.complete();
    if (this._overlayRef) {
      this._overlayRef.dispose();
    }
  }

}
