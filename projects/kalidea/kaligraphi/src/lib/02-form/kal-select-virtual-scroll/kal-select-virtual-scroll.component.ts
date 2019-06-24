import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  Host,
  HostBinding,
  HostListener,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  OnDestroy,
  Optional,
  Injector} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { DataSource, CollectionViewer, ListRange } from '@angular/cdk/collections';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription, Observable, combineLatest } from 'rxjs';
import { filter, map, startWith} from 'rxjs/operators';

import { AutoUnsubscribe, buildProviders, FormElementComponent } from '../../utils';
import { KalDataSourceManager } from '../../utils/classes/kal-data-source-manager';
import { KalThemeDirective } from '../../99-utility/directives/kal-theme/kal-theme.directive';
import { KalOverlayService } from '../../99-utility/services/kal-overlay.service';
import { KalVirtualScrollConfig } from '../../utils/classes/kal-virtual-scroll-config';

type KalSelectDataSource<T> = DataSource<T> | Observable<T[]> | T[];

const defaultVirtualScrollConfig: KalVirtualScrollConfig = {
  itemSize: 27,
  height: 270,
  minBufferPx: 0,
  maxBufferPx: 0,
};

@Component({
  selector: 'kal-select-virtual-scroll',
  templateUrl: './kal-select-virtual-scroll.component.html',
  styleUrls: ['./kal-select-virtual-scroll.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: buildProviders(KalSelectVirtualScrollComponent)
})
export class KalSelectVirtualScrollComponent<T extends {id: number, label: string }>
  extends FormElementComponent<any>
  implements OnInit, OnDestroy, CollectionViewer {

  options: T[] = [];

  viewChange: Observable<ListRange>;

  /**
   * Overlay Portal Options
   */
  @ViewChild('optionsPortal') optionsPortal: TemplatePortal<any>;

  /**
   * Virtual Scroll Viewport
   */
  @ViewChild(CdkVirtualScrollViewport) cdkVirtualScrollViewport: CdkVirtualScrollViewport;

  @Input() noSearchResult = 'No results found';

  /**
   * tab index for this element
   */
  @Input()
  @HostBinding('attr.tabIndex')
  tabIndex: number = null;

  @Output() readonly selectChange = new EventEmitter();

  /**
   * Copy of the options
   */
  originalOptions: T[];

  /**
   * control used to filter options
   */
  searchControl = new FormControl();

  /**
   * Overlay Reference
   */
  private overlayRef: OverlayRef;

  /**
   * Whether the overlay panel is open or not
   */
  isPanelOpen: boolean;

  /**
   * Whether the select is disabled or not
   */
    disabled: boolean;

  /**
   * Whether this element is focused
   */
  isFocused: boolean;

  /**
   * Whether this element selects multiple value or not
   */
  isMultiple: boolean;

  @AutoUnsubscribe()
  private subscription: Subscription = Subscription.EMPTY;

  @AutoUnsubscribe()
  private overlaySubscriptions: Subscription = Subscription.EMPTY;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private kalOverlay: KalOverlayService,
    private injector: Injector,
    @Optional() @Host() private themeDirective: KalThemeDirective
  ) {
    super();
  }


  /**
  * DataSourceManager
  */
  private _dataSourceManager = new KalDataSourceManager<T>(this);

  @Input()
  get dataSource(): KalSelectDataSource<T> {
     return this._dataSourceManager.dataSource;
  }
  set dataSource( dataSource: KalSelectDataSource<T>) {
    this._dataSourceManager.dataSource = dataSource;
    this.subscription.unsubscribe();
    if (dataSource) {
      this.setOptions(this._dataSourceManager.observable);
    } else {
      this.options = [];
      this.originalOptions = [];
      this.cdr.markForCheck();
    }
  }

  /**
   * The virtual scroll config
   */
  private _virtualScrollConfig: KalVirtualScrollConfig = defaultVirtualScrollConfig;

  @Input()
  get virtualScrollConfig(): KalVirtualScrollConfig {
    return this._virtualScrollConfig;
  }

  set virtualScrollConfig(value: KalVirtualScrollConfig) {
    this._virtualScrollConfig = {
      ...defaultVirtualScrollConfig,
      height: value.height || defaultVirtualScrollConfig.height,
      itemSize: value.itemSize || defaultVirtualScrollConfig.itemSize
    };
  }

  get virtualScrollHeight(): number {
    if (this.options.length === 0) {
      return this.virtualScrollConfig.itemSize;
    }
    if (this.options.length * this.virtualScrollConfig.itemSize > this.virtualScrollConfig.height) {
      return this.virtualScrollConfig.height;
    }
    return this.options.length * this.virtualScrollConfig.itemSize;
  }

  @Input()
  get multiple() {
    return this.isMultiple;
  }
  set multiple(multiple: boolean) {
    this.isMultiple = coerceBooleanProperty(multiple);
    // When changing from multiple to single only keep one option
    if (this.selected && !this.isMultiple && this.selectedOptions.length > 1) {
      this.selectedOptions = this.selectedOptions.slice(0, 1);
      super.notifyUpdate(this.selectedOptions[0].id);
      this.valueChanges.emit(this.selectedOptions[0].id);
    }
  }

  private selectedOptions: T[] = [];

  get selected(): T | T[] {
    if (!this.selectedOptions || this.selectedOptions.length === 0) {
      return null;
    }
    return this.multiple ? this.selectedOptions : this.selectedOptions[0];
  }

  /**
   * Focus the select element
   */
  @HostListener('focus')
  focus(): void {
    if (!this.disabled) {
      this.elementRef.nativeElement.focus();
      this.isFocused = true;
    }
  }

  /**
   * Blur the select Element
   */
    @HostListener('blur')
    blur(): void {
      if (!this.isPanelOpen) {
        this.isFocused = false;
        this.close();
      }
    }

  /**
   * Whether or not the overlay panel is open
   */
  get panelOpen(): boolean {
    return this.isPanelOpen;
  }

  /**
   * Select the given option
   */
  select(values: any) {
    if (this.multiple && values instanceof Array) {
      (values as number[]).map( id => this.selectMultiple(id, false));
      this.valueChanges.emit(this.selectedOptions.map(o => o.id));
    } else if (values !== null && values !== undefined) {
      const optionId = values instanceof Array ? values[0] : values;
      if (this.multiple) {
        this.selectMultiple(optionId);
      } else {
        this.selectSimple(optionId);
      }
    }
  }

  /**
   * Select an option when not on multiple mode
   */
  selectSimple(optionId, withNotify = true) {
    const option = this.originalOptions.find( o => o.id === optionId);
    this.selectedOptions = option ? [option] : [];
    this.searchControl.patchValue(this.label);

    if (withNotify) {
      this.notifyUpdate(this.selectedOptions[0].id);
      this.valueChanges.emit(this.selectedOptions[0].id);
    }
    this.close();
    this.cdr.markForCheck();
  }

  /**
   * Select an option when on multiple mode
   */
  selectMultiple(optionId, withNotify = true) {
    const option = this.originalOptions.find( o => o.id === optionId);
    const index  = this.selectedOptions.indexOf(option);
    if ( index !== -1) {
      this.selectedOptions.splice(index, 1);
    } else {
      this.selectedOptions.push(option);
      this.selectedOptions.sort((a, b) => this.originalOptions.indexOf(a) - this.originalOptions.indexOf(b));
    }
    if (withNotify) {
      super.notifyUpdate(this.selectedOptions.map( o => o.id));
      this.valueChanges.emit(this.selectedOptions.map( o => o.id));
    }
  }

  /**
   * Reset selection
   */
  reset() {
    this.selectedOptions = [];
    this.cdr.markForCheck();
  }

  /**
   * Open the overlay select
   */
  open(): void {
    if (this.disabled || !this.options || this.isPanelOpen) {
      return;
    }

    if (!this.isFocused) {
      this.focus();
    }

    if (!this.overlayRef) {
      this.createOverlay();
    }
    this.overlayRef.updateSize({
      width: this.elementRef.nativeElement.getBoundingClientRect().width
    });

    this.overlayRef.attach(this.optionsPortal);
    this.isPanelOpen = true;
  }

  /**
   * close the select overlay
   */
  close(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.isPanelOpen = false;
  }


  /**
   * get themes applied on host
   */
  get theme() {
    return this.themeDirective ? this.themeDirective.rawThemes : '';
  }

  /**
   * create overlayRef
   */
  private createOverlay() {
    this.overlayRef = this.kalOverlay.createFlexibleOverlay(this.elementRef);

    this.overlaySubscriptions = this.overlayRef.backdropClick().subscribe(() => {
      this.isFocused = false;
      this.close();
    });

    this.overlaySubscriptions.add(
      this.overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close())
    );
  }

  isActive(option) {
    if (!this.selectedOptions || this.selectedOptions.length === 0) {
      return false;
    }
    return !!this.selectedOptions.find(o => option.id === o.id);
  }

  get label(): string {
    if (this.selected) {
      return this.multiple ? (this.selected as T[]).map(option => option.label).join(', ') : (this.selected as T).label;
    } else {
      return this.placeholder ? this.placeholder : '';
    }
  }

  private setOptions( dataSource$: Observable<T[] | ReadonlyArray<T>>) {
    this.subscription = combineLatest( dataSource$, this.searchControl.valueChanges.pipe(startWith(''))).pipe(
      map(([items, term]: [T[], string]) => {
        if (this.originalOptions !== items) {
          this.originalOptions = items || [];

          if (this.ngControl) {
            this.select(this.ngControl.value);
          }
        }
        return items.filter( item => item.label.includes(term));
      })
    ).subscribe(
      (items: T[] ) => {
        this.options = items !== undefined ? items : [];
        if (!!this.cdkVirtualScrollViewport && this.isPanelOpen) {
          this.cdr.detectChanges();
          this.cdkVirtualScrollViewport.checkViewportSize();
        } else {
          this.cdr.markForCheck();
        }
      }
    );
  }

  ngOnInit() {
    this.ngControl = this.injector.get(NgControl, null);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
    this.subscription.unsubscribe();
  }
}
