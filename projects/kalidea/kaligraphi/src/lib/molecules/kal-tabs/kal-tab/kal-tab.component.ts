import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
  selector: 'kal-tab',
  templateUrl: './kal-tab.component.html',
  styleUrls: ['./kal-tab.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KalTabComponent implements OnInit, AfterViewInit {

  @Input() label = '';

  @ViewChild('tabContent') tabContent: TemplatePortal<any>;

  constructor() {
  }

  get content(): TemplatePortal<any> {
    return this.tabContent;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

}
