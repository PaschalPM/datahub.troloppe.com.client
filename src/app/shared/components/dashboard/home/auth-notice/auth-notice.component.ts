import { Component } from '@angular/core';
import { MyMatIconComponent } from '../../../common/my-mat-icon.component';
import { CommonModule } from '@angular/common';
import { PermissionService } from '../../../../services/permission.service';

@Component({
  selector: 'dashboard-home-auth-notice',
  standalone: true,
  imports: [MyMatIconComponent, CommonModule],
  template: `
    <div
      class="flex gap-2 rounded-lg bg-white p-2 text-sm  shadow-md backdrop-blur-md dark:border-white/50 dark:bg-white/20  dark:shadow-sm dark:shadow-white/35 md:items-center"
    >
      <my-mat-icon class="shrink-0 text-dodger-blue dark:text-orange-400">
        help
      </my-mat-icon>
      @if(permission.isAdmin){
      <ng-container *ngTemplateOutlet="admin"></ng-container>
      } @else if (permission.isResearchManager) {
      <ng-container *ngTemplateOutlet="researchManager"></ng-container>
      } @else {
      <ng-container *ngTemplateOutlet="researchStaff"></ng-container>

      }
    </div>

    <ng-template #admin>
      <div class="brightness-50 dark:brightness-75">
        as <span class="font-semibold"> the admin</span>, you have unrestricted
        access.
      </div>
    </ng-template>

    <ng-template #researchManager>
      <div class="brightness-50 dark:brightness-75">
        as a <span class="font-semibold"> research manager</span> you can view,
        create, update, delete and
        <span class="cursor-pointer text-dodger-blue dark:text-orange-400"
          >verify data
        </span>
      </div>
    </ng-template>

    <ng-template #researchStaff>
      <div class="brightness-50 dark:brightness-75">
        as a <span class="font-semibold"> research staff</span> you can view and
        create data, but only update and delete your
        <span class="cursor-pointer text-dodger-blue dark:text-orange-400"
          >unverified data
        </span>
      </div>
    </ng-template>
  `,
})
export class AuthNoticeComponent {
  constructor(public permission: PermissionService) {}
}
