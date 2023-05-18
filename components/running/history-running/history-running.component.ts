import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { RunningService } from '../../services/running.service';
import { MatTableDataSource } from '@angular/material/table';
import { running } from '../../models/running';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../dilog/stop-running/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-history-running',
  templateUrl: './history-running.component.html',
  styleUrls: ['./history-running.component.css'],
})
export class HistoryRunningComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayColumns = [
    'title',
    'date',
    'duration',
    'calories',
    'status',
    'actions',
  ];
  dataSource = new MatTableDataSource<running>();
  historyServiceSubscription!: Subscription;
  paginationSize!: number;
  constructor(
    private runningService: RunningService,
    public dialog: MatDialog
  ) {}

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim();
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  opendialog(flag: number, id?: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true && flag === 1) {
        this.runningService.delteallforUser();
      } else if (result === true && flag === 2) {
        this.runningService.deleteOne(id as string);
      }
    });
  }
  ngOnInit() {
    this.historyServiceSubscription =
      this.runningService.pastRunningChange.subscribe((data: running[]) => {
        this.dataSource.data = data;

        this.paginationSize = this.dataSource.data.length;
      });
    this.runningService.fetcAviliableRunnings();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.historyServiceSubscription.unsubscribe();
  }
}
