import { Pipe, PipeTransform } from '@angular/core';
import { min } from 'rxjs';

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(minutes: number): string {
    const mins = Math.floor(Math.abs(minutes));
    const secs = Math.floor((Math.abs(minutes) - mins) * 60);
    const seconsString = secs < 10 ? `0${secs}` : `${secs}`;
    return `${mins} : ${secs}`;
  }
}
