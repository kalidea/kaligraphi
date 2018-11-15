import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Inject, ChangeDetectorRef } from '@angular/core';
import { KalDialogService, KalDialogConfig, KAL_DIALOG_DATA, KalDialogRef } from '@kalidea/kaligraphi';


/**
 * type of data
 */
export interface ExampleDialogData {
  user: {
    firstname,
    lastname
  };
  closed?: number;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements OnInit {
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
  disableClose = true;

  /**
   * is this modal dismissable
   */
  hasBackdrop = true;

  constructor(private dialogService: KalDialogService, private cdr: ChangeDetectorRef) {
  }

  /**
   * get default dialog config
   */
  private get config() {
    return {
      disableClose: this.disableClose,
      hasBackdrop: this.hasBackdrop
    };
  }

  /**
   * open confirm dialog
   */
  openConfirmDialog() {
    const config = new KalDialogConfig<ExampleDialogData>({
      title: 'Confirmation de suppression',
      ...this.config
    });
    const dialogRef = this.dialogService.open(OverviewExampleDialogComponent, config);

    dialogRef.afterClosed.subscribe(result => {
      this.resultConfirm = result;
      this.cdr.markForCheck();
    });
  }

  /**
   * open dialog
   */
  openDialog() {

    const config = new KalDialogConfig<ExampleDialogData>({
      title: 'Modal to open',
      ...this.config,
      data: {
        user: {
          firstname: 'john',
          lastname: 'doe'
        }
      }
    });

    const dialogRef = this.dialogService.open(OverviewExampleDialogComponent, config);

    dialogRef.afterClosed.subscribe(result => {
      this.result = result;
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
  }

}

export let counter = 0;

@Component({
  template: `

    <!-- content -->
    <div kalDialogContent>
      Example Dialog for {{ data.user.firstname }} {{ data.user.lastname }} N°{{ id }}
      <blockquote *ngIf="result"> closed {{ result }}</blockquote>
    </div>

    <!-- footer -->
    <div kalDialogFooter>
      <kal-button (click)="openDialog()">Open Sub Dialog {{ id + 1 }}</kal-button>
      <kal-button kalDialogClose>Close Dialog</kal-button>
      <kal-button (click)="submitDialog()">Submit Dialog</kal-button>
    </div>
  `,
})
export class OverviewExampleDialogComponent {

  /**
   * id of dialog
   */
  id = counter++;

  /**
   * result of the closed dialog
   */
  result: number;

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

    dialogRef.afterClosed.subscribe(result => {
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

}
