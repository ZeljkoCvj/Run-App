import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopRunningComponent } from '../../dilog/stop-running/stop-running.component';
import { RunningService } from '../../services/running.service';

@Component({
  selector: 'app-current-running',
  templateUrl: './current-running.component.html',
  styleUrls: ['./current-running.component.css'],
})
export class CurrentRunningComponent implements OnInit {
  @Output() newRun = new EventEmitter();
  progess = 0;
  timer: any;
  messege = 'Don t give up';
  runnigModeStarted: any;
  constructor(
    public dialog: MatDialog,
    private runningService: RunningService
  ) {}

  startorResume() {
    const runningTimeInsecond = this.runnigModeStarted.duration * 60;
    const intervalrunniginMs = (runningTimeInsecond / 100) * 1000;
    this.timer = setInterval(() => {
      this.progess += 1;
      if (this.progess > 35) {
        this.messege = 'Don t give up , you can t do it!';
      }
      if (this.progess > 70) {
        this.messege = 'Almost done champ!';
      }

      if (this.progess === 100) {
        this.messege = 'Well done!';
        this.runningService.compliteRun();
        clearInterval(this.timer);
      }
    }, intervalrunniginMs);
  }
  openDialog() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopRunningComponent, {
      data: {
        progress: this.progess,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.runningService.stopRunning(this.progess);
      } else {
        this.startorResume();
      }
    });
  }
  ngOnInit() {
    this.runnigModeStarted = this.runningService.getRunningStarted();
    this.startorResume();
  }
}
