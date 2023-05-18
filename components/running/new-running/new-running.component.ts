import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { RunningService } from '../../services/running.service';
import { running } from '../../models/running';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-running',
  templateUrl: './new-running.component.html',
  styleUrls: ['./new-running.component.css'],
})
export class NewRunningComponent implements OnInit, OnDestroy {
  constructor(public runnings: RunningService) {}

  aviliableRunning!: running[];
  aviliableRunningSubscription!: Subscription;

  startRunning(form: NgForm) {
    this.runnings.startRun(form.value.run);
  }

  ngOnInit(): void {
    // this.aviliableRunning = this.runnings.getAvailableRunnings();
    this.aviliableRunningSubscription =
      this.runnings.aviliableRunningChange.subscribe((data) => {
        this.aviliableRunning = data;
      });
    this.runnings.fetchHistoryRunnings();
  }

  ngOnDestroy() {
    this.aviliableRunningSubscription.unsubscribe();
  }
}
