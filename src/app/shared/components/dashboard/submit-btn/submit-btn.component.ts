import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dashboard-submit-btn',
  standalone: true,
  imports: [MyMatIconComponent, NgIf],
  template: `
    <button
      class="rounded-sm text-xs md:text-sm p-4 py-2 font-medium tracking-wider bg-dodger-blue hover:bg-dodger-blue/70 dark:bg-orange-400 dark:hover:bg-orange-400/70 dark:text-black text-white disabled:bg-gray-300 disabled:dark:bg-gray-800 disabled:dark:text-gray-500 flex justify-center items-center gap-2"
      [disabled]="isLoading"
    >
      <span class="uppercase"> <ng-content></ng-content> </span>

      <my-mat-icon *ngIf="isLoading" class="animate-spin">
        settings
      </my-mat-icon>
    </button>
  `,
})
export class SubmitBtnComponent {
  @Input() isLoading = false;
}
