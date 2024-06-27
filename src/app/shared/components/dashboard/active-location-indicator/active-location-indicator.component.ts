import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { UtilsService } from '../../../services/utils.service';
import { ModalService } from '../../../services/modal.service';
import { ActiveLocationFormModalComponent } from '../../../partials/modals/active-location-form-modal/active-location-form-modal.component';

@Component({
  selector: 'dashboard-active-location-indicator',
  standalone: true,
  imports: [NgIf, MyMatIconComponent],
  template: `
    <div
      class="my-6 mixin/base:font-bold mixin/base:font-mono mixin/base:flex mixin/base:items-center mixin/base:gap-2"
    >
      <ng-container
        *ngIf="
          hasActiveLocation;
          then showActiveLocation;
          else setActiveLocation
        "
      >
      </ng-container>
    </div>

    <!---: Show Active Location -->
    <ng-template #showActiveLocation>
      <div
        [class]="
          utils.cn('inline-flex items-center gap-2', { 'cursor-pointer': isPermitted })
        "
        (click)="isPermitted && onOpenFormModal()"
      >
        <div
          class="mixin/base text-green-700 dark:text-green-300 animate-pulse"
        >
          <my-mat-icon *ngIf="isPermitted"> edit_location_alt </my-mat-icon>
          <my-mat-icon *ngIf="!isPermitted"> location_on </my-mat-icon>
          <div>Ikoyi</div>
        </div>
      </div>
    </ng-template>

    <!---: Set Active Location -->
    <ng-template #setActiveLocation>
      <button
        *ngIf="isPermitted"
        title="Set Location"
        class="mixin/base bg-red-500 text-white p-2 rounded-md hover:opacity-75"
        (click)="onOpenFormModal()"
      >
        <my-mat-icon> edit_location_alt </my-mat-icon>
      </button>
    </ng-template>
  `,
})
export class ActiveLocationIndicatorComponent {
  hasActiveLocation = true;
  isPermitted = true;

  constructor(public utils: UtilsService, private modalService: ModalService) {}

  onOpenFormModal() {
    this.modalService.open(ActiveLocationFormModalComponent);
  }
}
