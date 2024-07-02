import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-delete-street-data-modal',
  standalone: true,
  imports: [MyMatIconComponent, TextButtonComponent],
  template: `
    <div class="space-y-6 py-2 text-center">
      <div class="text-center">
        <my-mat-icon class="text-6xl text-red-500 dark:text-red-400">
          delete
        </my-mat-icon>
      </div>
      <h1 class="text-xl font-medium text-red-500 dark:text-red-400">
        Confirm Delete
      </h1>
      <p>Are you sure you want to delete this street data record?</p>
      <div class="text-center flex justify-center">
        <text-button text="Yes" (clickEvent)="onDelete()"> </text-button>
      </div>
    </div>
  `,
})
export class DeleteStreetDataModalComponent {
  @Input({ required: true }) streetDataId!: number;

  constructor(private modalService: ModalService) {}
  onDelete() {
    alert(this.streetDataId);
    this.modalService.close();
  }
}
