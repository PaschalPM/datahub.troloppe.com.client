import { Component, Type } from '@angular/core';
import { ImageViewerModalService } from '@services/image-viewer-modal.service';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  imports: [],
  template: `
    @if (template) {
    <div
      appKeyupEscape
      (keyupEscape)="imageViewerModalService.close()"
      appClickSelf
      (clickSelf)="imageViewerModalService.close()"
      class="overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80 "
    >
      <img [src]="imageUrl" alt="" class="w-full h-screen object-contain p-5"/>
    </div>
    }
  `,
})
export class ImageViewerModalComponent {
  template!: Type<any>;
  imageUrl = '';

  constructor(public imageViewerModalService: ImageViewerModalService) {
    this.imageViewerModalService.listen((template, imageUrl) => {
      this.template = template;
      this.imageUrl = imageUrl;
    });
  }
}
