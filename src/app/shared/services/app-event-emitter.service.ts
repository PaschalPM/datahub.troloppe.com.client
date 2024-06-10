import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppEventEmitterService {
  private $observable$ = new BehaviorSubject<any>('');

  emit<T>(event: string, payload: T | string = '') {
    (this.$observable$ as BehaviorSubject<EventEmitterType<T | string>>).next({
      event,
      payload,
    });
  }

  listen<T>(event: string, cb: (payload: T) => void) {
    (this.$observable$ as BehaviorSubject<EventEmitterType<T>>).subscribe({
      next(obj) {
        if (event && event === obj.event) {
          cb(obj.payload);
        }
      },
    });
  }
}
