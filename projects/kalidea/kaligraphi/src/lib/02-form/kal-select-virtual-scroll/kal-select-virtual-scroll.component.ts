import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input, Output, EventEmitter, HostListener, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { AutoUnsubscribe, buildProviders, FormElementComponent } from '../../utils';
import { Subscription, Observable, combineLatest, of } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ESCAPE } from '@angular/cdk/keycodes';
import { DataSource, CollectionViewer, ListRange } from '@angular/cdk/collections';

export interface KalVirtualScrollConfig {
  itemSize: number;
  height: number;
}

type KalSelectDataSource<T> = DataSource<T> | Observable<T[]> | T[];

const defaultVirtualScrollConfig: KalVirtualScrollConfig = {
  itemSize: 30,
  height: 250
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
  implements OnInit, CollectionViewer {

  options: T[] = [];

  viewChange: Observable<ListRange>;

  /**
   * Overlay Portal Options
   */
  @ViewChild('optionsPortal') optionsPortal: TemplatePortal<any>;

  @Input() labelKey = 'label';
  @Input() idKey = 'id';
  @Input() selected;

  @Output() readonly selectChange = new EventEmitter();

  /**
   * Copy of the options
   */
  originalOptions: any[];

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

  // @AutoUnsubscribe() private subscription: Subscription = Subscription.EMPTY;
  @AutoUnsubscribe() private dataSourceSubscription: Subscription = Subscription.EMPTY;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay,
    private cdr: ChangeDetectorRef
  ) {
    super();
    window[`kalVSSelect`] = this;
  }


  /**
   * The select dataSource for options
   */
  private _dataSource: KalSelectDataSource<T>;

  @Input()
  get dataSource(): KalSelectDataSource<T> {
     return this._dataSource;
  }
  set dataSource( dataSource: KalSelectDataSource<T>){
    if (dataSource !== this._dataSource) {
      this.destroyDataSourceSubscription();
      this._dataSource = dataSource;
    }

    if (dataSource){
      this.observeDataSource();
    } else {
      this.options = [];
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
    if (value) {
      this._virtualScrollConfig = {
        height: value.height || defaultVirtualScrollConfig.height,
        itemSize: value.itemSize || defaultVirtualScrollConfig.itemSize
      };
    } else {
      this._virtualScrollConfig = defaultVirtualScrollConfig;
    }
    // if (this.isInitialized) {
    //   if (!value) {
    //     this.createKeyManager();
    //   } else {
    //     this.keyManager = null;
    //   }
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

  // /**
  //  * Filter the options
  //  * @param value term used for filtering
  //  */
  // search(value: string) {
  //   this.options = this.originalOptions.filter(
  //     // todo create an interface wrapping the object targetted by the option
  //     option => option[this.labelKey].includes(value)
  //   );
  // }

  select(option) {
    this.selected = option;
    this.selectChange.emit(option[this.idKey]);
    this.close();
  }

  /**
   * Open the overlay select
   */
  open(): void {
    if (  this.disabled || !this.options || this.isPanelOpen) {
      return;
    }

    this.focus();

    if (!this.overlayRef) {
      this.createOverlay();
    }
    this.overlayRef.attach(this.optionsPortal);
    this.isPanelOpen = true;
  }

  close(): void {
    if (this.overlayRef){
      this.overlayRef.detach();
    }
    this.isPanelOpen = false;
  }

  /**
   * create overlayRef
   */
  private createOverlay() {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top'}
      ]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: 'kal-overlay__transparent',
      width: this.elementRef.nativeElement.getBoundingClientRect().width,
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.isFocused = false;
      this.close();
    });

    this.overlayRef.keydownEvents()
      .pipe(filter(event => event.keyCode === ESCAPE))
      .subscribe(() => this.close());
  }

  isActive(option) {
    if (!this.selected) {
      return false;
    }
    return option[this.idKey] === this.selected[this.idKey];
  }

  get label() {
    return this.selected ? this.selected[this.labelKey] : 'Select...';
  }

  private setOptions( dataSource$: Observable<T[] | ReadonlyArray<T>>) {
    this.dataSourceSubscription = combineLatest( dataSource$, this.searchControl.valueChanges
      ).pipe(
        map( ([items, term]: [T[], string]) => {
          console.log(`filtering options ${items} with ${term}`);
          return items.filter( item => item.label.includes(term));
        })
      ).subscribe(
      (items: T[] ) => {
        this.options = items !== undefined ? items : [];
        this.cdr.markForCheck();
        console.log(this.options);
      }
    );
  }

  private observeDataSource() {
    if ((this.dataSource as DataSource<T>).connect instanceof Function) {
      this.setOptions( (this.dataSource as DataSource<T>).connect(this));
    } else if ( this.dataSource instanceof Observable) {
      this.setOptions((this.dataSource as Observable<T[]>));
    } else if ( Array.isArray(this.dataSource)) {
      this.setOptions(of(this.dataSource as T[]));
    }
  }

  private destroyDataSourceSubscription() {
    this.selected = null;
    this.dataSourceSubscription.unsubscribe();

    if (this.dataSource && (this.dataSource as DataSource<T>).connect instanceof Function){
      (this.dataSource as DataSource<T>).disconnect(this);
    }
  }

  ngOnInit() {
    // this.originalOptions = [...this.options];
    if (this.selected !== undefined) {
      this.selected = this.options.find(
        currentOption => currentOption[this.idKey] === this.selected
      );
    }

    this.searchControl.setValue('');
    // this.subscription = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   debounceTime(300),
    //   distinctUntilChanged(),
    // ).subscribe((term) => {
    //   console.log(`term "${term}"`);
    // });
  }
}
