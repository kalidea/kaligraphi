import { Location } from '@angular/common';
import { OverlayRef } from '@angular/cdk/overlay';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject, SubscriptionLike } from 'rxjs';
import { filter } from 'rxjs/operators';

import { KalDialogContainerComponent } from './kal-dialog-container.component';
import { KalDialogConfig } from './kal-dialog-config';
import { KalDialogService } from './kal-dialog.service';


export class KalDialogRef<T, D = any> {

  /**
   * The instance of component opened into the dialog.
   */
  componentInstance: T;

  /**
   * disable close for dialog
   */
  private disableClose: boolean | undefined = this.container.config.disableClose;

  /**
   * subject to watch close dialog
   */
  private afterClosedSubject = new Subject<D>();

  /**
   * subscriptions list for this class
   */
  private subscriptionsList: SubscriptionLike[] = [];

  constructor(readonly overlayRef: OverlayRef,
              private container: KalDialogContainerComponent,
              private kalDialogService: KalDialogService,
              public config: KalDialogConfig<D>,
              location?: Location,
              readonly id?: string) {

    this.subscriptionsList.push(
      this.overlayRef.backdropClick().subscribe(() => {
        if (!this.disableClose) {
          this.close();
        }
      }),
      this.overlayRef.keydownEvents()
        .pipe(filter(event => event.keyCode === ESCAPE && !this.disableClose))
        .subscribe(() => this.close())
    );

    if (location) {
      // Close the dialog when the user goes forwards/backwards in history or when the location
      // hash changes. Note that this usually doesn't include clicking on links (unless the user
      // is using the `HashLocationStrategy`).
      this.subscriptionsList.push(location.subscribe(() => {
        this.close();
      }));
    }
  }

  /**
   * callback when dialog is closed
   */
  get afterClosed() {
    return this.afterClosedSubject.asObservable();
  }

  /**
   * triggered when dialog is closed
   */
  close(result?: D) {

    this.afterClosedSubject.next(result);

    this.completeDialogClose();
  }

  /**
   * finish dialog close
   */
  private completeDialogClose() {

    // complete afterClose subject
    this.afterClosedSubject.complete();

    // close dialog
    this.kalDialogService.detachOverlay(this.overlayRef);

    // clean subscriptions
    this.subscriptionsList.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}
