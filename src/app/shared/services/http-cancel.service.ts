import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCancelService {
  private cancelPendingRequests$ = new Subject<void>();

  onCancelPendingRequest() {
    return this.cancelPendingRequests$.asObservable();
  }

  cancelPendingRequests() {
    this.cancelPendingRequests$.next();
  }
  constructor() {}
}
