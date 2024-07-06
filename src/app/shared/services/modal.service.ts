import { Injectable, Type } from '@angular/core';
import { BaseModalService } from './base-modal.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private baseModalService: BaseModalService) {}

  open(template: Type<any>, inputs: InputsType = undefined) {
    this.baseModalService.openModal(template, inputs);
  }
  close() {
    this.baseModalService.closeModal();
  }
  listen(cb: (template: Type<any>, inputs: InputsType) => void) {
    this.baseModalService.listenToModal(cb);
  }
}
