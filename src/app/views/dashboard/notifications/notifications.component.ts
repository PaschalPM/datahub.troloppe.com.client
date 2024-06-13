import { Component } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { NotificationItemComponent } from '../../../shared/components/dashboard/notification-item/notification-item.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationItemComponent, NgIf],
  templateUrl: './notifications.component.html',
  styles: ``
})
export class NotificationsComponent {
  private activeTabClass =
    'border-b-2 border-black text-black dark:text-white p-2 px-4 font-medium dark:border-white';

  noNotificationClass = 'mt-16 p-2 py-4 text-center font-medium pb-12';
  unreadPane = true;
  allPane = false;
  tabClass = 'p-2 px-4 text-black/50 dark:text-white/50 transition-all';

  get unreadPaneActive() {
    return this.unreadPane ? this.activeTabClass : '';
  }
  get allPaneActive() {
    return this.allPane ? this.activeTabClass : '';
  }

  constructor(
    public utils: UtilsService,
    public ns: NotificationsService,
  ) {}

  openUnreadPane() {
    this.unreadPane = true;
    this.allPane = false;
  }

  openAllPane() {
    this.allPane = true;
    this.unreadPane = false;
  }
}
