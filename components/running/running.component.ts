import { Component, OnDestroy, OnInit } from '@angular/core';
import { RunningService } from '../services/running.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css'],
})
export class RunningComponent implements OnInit, OnDestroy {
  isnewrunningmode = false;
  runningSubscraption!: Subscription;
  constructor(private runningservice: RunningService) {}
  ngOnInit() {
    this.runningSubscraption = this.runningservice.runningChange.subscribe(
      (runningVal) => {
        this.isnewrunningmode = runningVal ? true : false;
      }
    );
  }

  ngOnDestroy() {
    this.runningSubscraption.unsubscribe();
  }
}
