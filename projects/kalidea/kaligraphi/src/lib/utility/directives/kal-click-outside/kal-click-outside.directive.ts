import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({selector: '[kalClickOutside]'})
export class KalClickOutsideDirective  {

  /**
   * event emitted when clicking outside
   */
  @Output() kalClickOutside = new EventEmitter<MouseEvent>();

  constructor(protected elementRef: ElementRef) {
  }

  /**
   * triggered when someone click outside this element
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {

    const targetElement = event.target as HTMLElement;

    // Check if the click was outside the element
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
      this.kalClickOutside.emit(event);
    }
  }
}
