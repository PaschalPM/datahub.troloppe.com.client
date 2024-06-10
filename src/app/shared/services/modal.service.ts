import { EventEmitter, Injectable, Type } from '@angular/core';

type InputsType = Record<string, unknown> | undefined;
type ValueType = { template: Type<any>; inputs: InputsType };
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private template!: Type<any> | null;
  private inputs!: InputsType;
  private eventEmitter = new EventEmitter();

  constructor() {}

  open(template: Type<any>, inputs: InputsType = undefined) {
    this.template = template;
    this.inputs = inputs;
    this.eventEmitter.emit({ template, inputs });
  }
  close() {
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
