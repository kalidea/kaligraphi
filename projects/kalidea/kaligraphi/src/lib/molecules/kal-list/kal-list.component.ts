import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T> implements OnInit {

  /**
   * Results list
   */
  results: T[];

  /**
   * Row templates
   */
  @Input() rowTemplate: TemplateRef<any>;

  /**
   * Datasource to give items list to the component
   */
  @Input() datasource: any;

  /**
   * Triggered when selection has changed
   */
  @Output() selectionChange = new EventEmitter<T>();
  /**
   * The selected item
   */
  private selectedItem = null;

  /**
   * Initials config
   */
  private initialsConfig: (item: T) => string = null;

  /**
   * Is the row disabled
   */
  private isDisabled: (item: T) => boolean = (item: T) => false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  /**
   * Display initials in listing
   */
  @Input()
  get initials(): (item: T) => string {
    return this.initialsConfig;
  }

  set initials(value: (item: T) => string) {
    this.initialsConfig = value;
    this.cdr.markForCheck();
  }

  /**
   * Disable rows in template
   */
  @Input()
  get disabledRow(): (item: T) => boolean {
    return this.isDisabled ? this.isDisabled : (item: T) => false;
  }

  set disabledRow(value: (item: T) => boolean) {
    this.isDisabled = value;
    this.cdr.markForCheck();
  }

  /**
   * Return the number of elements in list
   */
  get countElements(): number {
    return this.results.length;
  }

  /**
   * Select an item in list and emit an event with the selected item value
   */
  selectItem(item: T) {
    if (!this.disabledRow(item)) {
      this.selectedItem = item;
      this.selectionChange.emit(item);
    }
  }

  /**
   * Is the item selected
   */
  isSelected(item): boolean {
    return this.selectedItem === item;
  }

  /**
   * Reset the selected item
   */
  reset() {
    this.selectedItem = null;
    this.cdr.markForCheck();
  }

  /**
   * display initials in listing
   */
  containsInitials(item: T, index: number): boolean {
    const previousItem = this.results[index - 1];

    return this.initials
      && (!previousItem || this.initials(previousItem) !== this.initials(item));
  }

  ngOnInit() {
    this.results = [];

    if (this.datasource) {
      this.datasource.connect().subscribe(
        element => {
          this.results = element;
        }
      );
    }
  }
}
