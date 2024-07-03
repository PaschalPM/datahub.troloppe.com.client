import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-image-preview',
  standalone: true,
  imports: [],
  template: `
    <img
      class="h-16 object-cover my-2 text-center"
      [src]="imagePath"
    />
  `,
  styles: `
  :host {
    display: content
  }
  `,
})
export class ImagePreviewComponent implements ICellRendererAngularComp {
  public imagePath = '';

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.imagePath = params.value;
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }
}
