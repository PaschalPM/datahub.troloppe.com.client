import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private eventEmitter = new EventEmitter();

  start() {
    this.eventEmitter.emit(true);
  }

  stop() {
    this.eventEmitter.emit(false)
  }

  observe() {
    return this.eventEmitter.asObservable();
  }
}
