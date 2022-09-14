import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { AutoUnsubscribe, KalDialogConfig, KalDialogService } from '@kalidea/kaligraphi';
import { Subscription } from 'rxjs';
import { ExampleDialogData, OverviewExampleDialogComponent } from 'src/app/dialogs/overview-example-dialog.components';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnDestroy {

  /**
   * result of dialog after closing
   */
  result: any;
  /**
   * result of dialog after closing
   */
  resultConfirm: any;

  /**
   * is this modal dismissable
   */
  disableClose = false;

  /**
   * is this modal dismissable
   */
  hasBackdrop = true;

  @AutoUnsubscribe()
  private subscriptionsList: Subscription[] = [];

  constructor(private dialogService: KalDialogService, private cdr: ChangeDetectorRef) {
  }

  /**
   * get default dialog config
   */
  private get config(): {disableClose: boolean, hasBackdrop: boolean} {
    return {
      disableClose: this.disableClose,
      hasBackdrop: this.hasBackdrop
    };
  }

  /**
   * open confirm dialog
   */
  openConfirmDialog(): void {
    const config = new KalDialogConfig<ExampleDialogData>({
      title: 'Confirm deletion',
      ...this.config,
      data: {
        confirm: true
      }
    });
    const dialogRef = this.dialogService.open(OverviewExampleDialogComponent, config);

    this.subscriptionsList.push(dialogRef.afterClosed.subscribe(result => {
      this.resultConfirm = result;
      this.cdr.markForCheck();
    }));
  }

  /**
   * open dialog
   */
  openDialog(): void {

    const config = new KalDialogConfig<ExampleDialogData>({
      title: 'Modal\'s title',
      ...this.config,
      data: {
        user: {
          firstname: 'john',
          lastname: 'doe'
        }
      }
    });

    const dialogRef = this.dialogService.open(OverviewExampleDialogComponent, config);

    this.subscriptionsList.push(dialogRef.afterClosed.subscribe(result => {
      this.result = result;
      this.cdr.markForCheck();
    }));
  }

  ngOnDestroy(): void {
  }

}
