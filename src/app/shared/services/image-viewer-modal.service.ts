import { Injectable, Type } from '@angular/core';
import { BaseModalService } from './base-modal.service';

@Injectable({
  providedIn: 'root',
})
export class ImageViewerModalService {
  constructor(private baseModalService: BaseModalService) {}

  open(imageUrl: string) {
    this.baseModalService.openImageModal(imageUrl);
  }
  close() {
    this.baseModalService.closeImageModal();
  }
  listen(cb: (template: Type<any>, imageUrl: string) => void) {
    this.baseModalService.listenToImageModal(cb);
  }
}
