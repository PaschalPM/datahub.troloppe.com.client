import { EventEmitter, Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

function popState(){
  history.go(1)
}
type InputsType = Record<string, unknown> | undefined;
type ValueType = { template: Type<any>; inputs: InputsType };
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private template!: Type<any> | null;
  private inputs!: InputsType;
  private eventEmitter = new EventEmitter();

  isOpen$ = new BehaviorSubject(false);
  isOpen = this.isOpen$.asObservable();



  constructor() {}

  open(template: Type<any>, inputs: InputsType = undefined) {
    history.pushState(null, '', location.href)
    window.addEventListener('popstate', popState)

    this.isOpen$.next(true);
    this.template = template;
    this.inputs = inputs;
    this.eventEmitter.emit({ template, inputs });
  }
  close() {
    history.back()
    window.removeEventListener('popstate', popState)
    this.isOpen$.next(false);
    this.template = null;
    this.inputs = undefined;
    this.eventEmitter.emit({ template: this.template, inputs: this.inputs });
  }

  listen(cb: (template: Type<any>, inputs: InputsType) => void) {
    this.eventEmitter.subscribe(({ template, inputs }: ValueType) => {
      cb(template, inputs);
    });
  }
}
