import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  Inject,
  OnInit,
  Optional,
  QueryList,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'kal-list',
  template: `
    <ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListComponent implements OnInit {

  @ContentChildren(forwardRef(() => KalListItemComponent), {descendants: true}) itemsList: QueryList<KalListItemComponent>;

  constructor() {
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'kal-list-item',
  templateUrl: './kal-list-item.component.html',
  styleUrls: ['./kal-list-item.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalListItemComponent implements OnInit {

  constructor(@Optional() @Inject(forwardRef(() => KalListComponent)) private kalList: KalListComponent) {
  }

  ngOnInit() {
  }

}
