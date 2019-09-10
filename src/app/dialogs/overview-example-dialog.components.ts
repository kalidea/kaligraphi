import { Component, Inject, OnDestroy } from '@angular/core';
import { AutoUnsubscribe, KAL_DIALOG_DATA, KalDialogConfig, KalDialogRef, KalDialogService } from '@kalidea/kaligraphi';
import { Subscription } from 'rxjs';

/**
 * type of data
 */
export interface ExampleDialogData {
  user: {
    firstname,
    lastname
  };
  confirm?: boolean;
  closed?: number;
}


export let counter = 0;

@Component({
  template: `
    <ng-container *ngIf="!data.confirm; else confirm">
      <!-- content -->
      <div kalDialogContent>
        Example Dialog for {{ data?.user.firstname }} {{ data?.user.lastname }} N°{{ id }}
        <kal-input [(ngModel)]="data.user.firstname" label="firstname"></kal-input>
        <kal-input [(ngModel)]="data.user.lastname" label="lastname"></kal-input>
        <blockquote *ngIf="result"> closed {{ result }}</blockquote>

      </div>

      <!-- footer -->
      <div kalDialogFooter>
        <kal-button (click)="openDialog()" kalTheme="secondary">Sub Dialog {{ id + 1 }}</kal-button>
        <kal-button kalDialogClose kalTheme="tertiary">Close</kal-button>
        <kal-button (click)="submitDialog()" kalTheme="primary">Submit</kal-button>
      </div>
    </ng-container>

    <ng-template #confirm>
      <div kalDialogContent>
        Do you confirm ?
      </div>

      <div kalDialogFooter>
        <kal-button kalDialogClose kalTheme="tertiary">No</kal-button>
        <kal-button (click)="submitDialog()" kalTheme="primary">Yes</kal-button>
      </div>
    </ng-template>
  `,
})

export class OverviewExampleDialogComponent implements OnDestroy {

  /**
   * id of dialog
   */
  id = counter++;

  /**
   * result of the closed dialog
   */
  result: number;

  @AutoUnsubscribe()
  private subscription = Subscription.EMPTY;

  constructor(
    private dialogRef: KalDialogRef<OverviewExampleDialogComponent>,
    private dialogService: KalDialogService,
    @Inject(KAL_DIALOG_DATA) public data: ExampleDialogData) {
  }

  /**
   * close dialog
   */
  submitDialog() {
    this.data.closed = this.id;
    this.dialogRef.close(this.data);
  }

  /**
   * Open Dialog
   */
  openDialog() {

    const config = new KalDialogConfig<ExampleDialogData>({
      id: 'test',
      hasBackdrop: true,
      data: {
        user: {
          firstname: 'john',
          lastname: 'doe'
        }
      }
    });

    const dialogRef = this.dialogService.open(OverviewExampleDialogComponent, config);

    this.subscription = dialogRef.afterClosed.subscribe(result => {
      if (result) {
        this.result = result.closed;
      }
    });
  }

  /**
   * trigger for no click
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
  }

}
