import { Injectable, NgZone } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowFocusService {
  focusSubject = new Subject<boolean>();
  focus$ = this.focusSubject.asObservable();
  constructor(private ngZone: NgZone) {
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('focus', () => this.emitFocusEvent(true));
    });
  }

  private emitFocusEvent(isFocused: boolean) {
    this.ngZone.run(() => {
      this.focusSubject.next(isFocused);
    });
  }
}
