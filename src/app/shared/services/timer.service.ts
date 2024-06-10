import { Injectable } from '@angular/core';
import { Observable, interval, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  /**
   *
   * @param duration in seconds
   * @returns
   */
  timer(duration: number = 60): Observable<number> {
    return interval(1000).pipe(take(duration));
  }

  countdown(initialValue: number = 60): Observable<number> {
    return this.timer(initialValue).pipe(
      map((value) => initialValue - (value + 1))
    );
  }
}
