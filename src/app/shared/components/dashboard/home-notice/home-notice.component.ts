import { Component } from '@angular/core';
import { ClientStorageService } from '../../../services/client-storage.service';
import { User } from '../../../types/user';
import { CURRENT_USER_STORE_KEY } from '../../../constants';
import { UserRoles } from '../../../enums/user-roles';

@Component({
  selector: 'dashboard-home-notice',
  standalone: true,
  imports: [],
  template: `
    <div
      class="flex gap-2 rounded-lg bg-white p-2 text-sm  shadow-md backdrop-blur-md dark:border-white/50 dark:bg-white/20  dark:shadow-sm dark:shadow-white/35 md:items-center"
    >
      <!-- <mat-icon class="shrink-0 text-dodger-blue dark:text-orange-400">
        help
      </mat-icon> -->
      <div class="brightness-50 dark:brightness-75">
        you can view and create data, but only update and delete your
        <span class="cursor-pointer text-dodger-blue dark:text-orange-400"
          >unverified data
        </span>
      </div>
    </div>
  `,
})
export class HomeNoticeComponent {
  currentUser!: User | null;
  constructor(public css: ClientStorageService) {
    this.currentUser = css.local().get(CURRENT_USER_STORE_KEY);
  }
  checkRoles(role: `${UserRoles}`) {
    return this.currentUser?.roles.includes(role);
  }
}
