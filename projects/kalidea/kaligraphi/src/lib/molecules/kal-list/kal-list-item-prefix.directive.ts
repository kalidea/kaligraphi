import { ChangeDetectorRef, Directive, Input, TemplateRef } from '@angular/core';
import { Coerce } from '../../utils/decorators/coerce';
import { BehaviorSubject } from 'rxjs';

@Directive({
  selector: '[kalListItemPrefix]'
})
export class KalListItemPrefixDirective {

  constructor(public view: TemplateRef<any>,
              private cdr: ChangeDetectorRef) {
  }

  private $kalListItemPrefix = new BehaviorSubject(false);

  @Input() displayPrefixFunction = null;

  @Input()
  @Coerce('boolean')
  get kalListItemPrefix() {
    return this.$kalListItemPrefix.getValue();
  }

  set kalListItemPrefix(value: boolean) {
    this.$kalListItemPrefix.next(value);
    this.cdr.markForCheck();
  }

  get change() {
    return this.$kalListItemPrefix.asObservable();
  }

}
