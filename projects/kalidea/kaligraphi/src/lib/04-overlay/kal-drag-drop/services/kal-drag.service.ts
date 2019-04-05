import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * @TODO manage multitouch screen with multi drag
 */

@Injectable({
  providedIn: 'root'
})
export class KalDragService {

  private draggingSubject$ = new BehaviorSubject(null);

  constructor() {
  }

  /**
   * get draging observable
   */
  get dragging$() {
    return this.draggingSubject$.asObservable();
  }

  /**
   * get dragging element
   */
  get dragging() {
    return this.draggingSubject$.value;
  }

  /**
   * set dragging element
   */
  set dragging(element: any) {
    this.draggingSubject$.next(element);
  }
}
