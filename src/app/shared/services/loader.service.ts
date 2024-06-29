import { EventEmitter, Injectable } from '@angular/core';
import { ComponentType } from 'ngx-toastr';

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
