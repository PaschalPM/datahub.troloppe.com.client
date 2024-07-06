import { EventEmitter, Injectable, Type } from '@angular/core';
import { ImageViewerModalComponent } from '@components/image-viewer-modal/image-viewer-modal.component';

@Injectable({
  providedIn: 'root',
})
export class BaseModalService {
  protected modalTemplate!: Type<any> | null;
  protected imageModalTemplate!: Type<any> | null;
  protected modalInputs!: InputsType;
  private modalEventEmitter = new EventEmitter();
  private imageModalEventEmitter = new EventEmitter();

  constructor() {}

  openModal(template: Type<any>, inputs: InputsType = undefined) {
    this.setupHistoryState();
    this.modalTemplate = template;
    this.modalInputs = inputs;
    this.modalEventEmitter.emit({ template, inputs });
  }

  openImageModal(imageUrl: string) {
    this.setupHistoryState();
    this.imageModalTemplate = ImageViewerModalComponent;
    this.imageModalEventEmitter.emit({
      template: this.imageModalTemplate,
      imageUrl,
    });
  }
  closeModal() {
    this.tearDownHistoryState();
    this.resetModal();
  }
  closeImageModal() {
    this.tearDownHistoryState();
    this.resetImageModal();
  }

  listenToModal(cb: (template: Type<any>, inputs: InputsType) => void) {
    this.modalEventEmitter.subscribe(({ template, inputs }: ModalValueType) => {
      cb(template, inputs);
    });
  }
  listenToImageModal(cb: (template: Type<any>, imageUrl: string) => void) {
    this.imageModalEventEmitter.subscribe(({ template, imageUrl }: ImageModalValueType) => {
      cb(template, imageUrl);
    });
  }
  private popState() {
    this.resetModal();
    this.resetImageModal();
  }
  private setupHistoryState() {
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', this.popState.bind(this), {
      once: true,
    });
  }
  private tearDownHistoryState() {
    history.back();
    window.removeEventListener('popstate', this.popState.bind(this));
  }
  private resetModal() {
    this.modalTemplate = null;
    this.modalInputs = undefined;
    this.modalEventEmitter.emit({
      template: this.modalTemplate,
      inputs: this.modalInputs,
    });
  }
  private resetImageModal() {
    this.imageModalTemplate = null;
    this.imageModalEventEmitter.emit({
      template: this.imageModalTemplate,
      imageUrl: null
    });
  }
}
