import { Component, Type } from '@angular/core';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { ImageViewerModalService } from '@services/image-viewer-modal.service';

@Component({
  selector: 'app-image-viewer-modal',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `
    @if (template) {
    <div
      appKeyupEscape
      (keyupEscape)="imageViewerModalService.close()"
      appClickSelf
      (clickSelf)="imageViewerModalService.close()"
      class="overlay fixed inset-0 z-50 flex items-center justify-center bg-black/80 "
    >
      <button
        style="line-height: 60%;"
        class="text-3xl font-thin p-2 rounded-full text-white absolute right-5 top-5 hover:bg-dodger-blue/30 dark:hover:bg-yellow-700"
        (click)="imageViewerModalService.close()"
      >
        <my-mat-icon> close </my-mat-icon>
      </button>
      <img [src]="imageUrl" alt="" class="w-full h-screen object-contain p-5" />
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
