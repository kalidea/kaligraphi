import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';

@Component({
  selector: 'kal-list',
  templateUrl: './kal-list.component.html',
  styleUrls: ['./kal-list.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent<T> implements OnInit {

  results: T[];
  @Input() itemTemplate: TemplateRef<any>;
  @Input() datasource: DataSource<T>;
  @Output() selectionChange = new EventEmitter<T>();
  @Input() initials = null;
  private selectedItem = null;

  constructor() {
  }

  get countElements(): number {
    return this.results.length;
  }

  selectItem(item) {
    this.selectedItem = item;
    this.selectionChange.emit(item);
  }

  isSelected(item): boolean {
    return this.selectedItem === item;
  }

  displayInitials(row: T, index: number) {
    return this.initials
      && row[this.initials]
      && (!this.results[index - 1]
      || this.results[index - 1][this.initials].charAt(0) !== row[this.initials].charAt(0));
  }

  getInitial(row: T) {
    return row[this.initials].charAt(0).toLocaleUpperCase();
  }

  ngOnInit() {
    if (this.datasource) {
      this.datasource.connect().subscribe(
        element => {
          this.results = element;
        }
      );
    }
  }
}
