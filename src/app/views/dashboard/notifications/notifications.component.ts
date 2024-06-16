import { Component } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { NotificationItemComponent } from '../../../shared/components/dashboard/notification-item/notification-item.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PaneNavigatorPanelComponent } from '../../../shared/components/pane-navigator-panel/pane-navigator-panel.component';
import {  Subscription } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/svgs/spinner.component';

type PaneType = 'unreadNotifications' | 'allNotifications';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NotificationItemComponent,
    NgIf,
    AsyncPipe,
    PaneNavigatorPanelComponent,
    SpinnerComponent,
  ],
  templateUrl: './notifications.component.html',
  styles: `
    .empty-state {
      @apply mt-16 p-2 py-4 flex justify-center font-medium pb-12;
    }
  `,
})
export class NotificationsComponent {
  allNotifications: NotificationType[] | undefined = undefined;
  error: string | null = null;
  activePane: PaneType = 'unreadNotifications';

  get unreadNotifications(): NotificationType[] | undefined {
    return this.allNotifications?.filter((value) => !value.isRead);
  }

  get activeNotifications() {
    return this.activePane === 'unreadNotifications'
      ? this.unreadNotifications
      : this.allNotifications;
  }

  get noNotificationText(){
    return this.activePane === 'unreadNotifications'
      ? 'No Unread Notifications...'
      : 'No Notifications...'
  }

  get tabs() {
    return [
      {
        pane: 'unreadNotifications',
        tabLabel: `Unread (${this.unreadNotificationSum})`,
      },
      {
        pane: 'allNotifications',
        tabLabel: `All (${this.allNotificationSum})`,
      },
    ];
  }

  private get allNotificationSum(): number {
    const allNotifications = this.allNotifications;
    return allNotifications ? allNotifications.length : 0;
  }

  private get unreadNotificationSum(): number {
    const unreadNotifications = this.unreadNotifications;
    return unreadNotifications ? unreadNotifications.length : 0;
  }

  constructor(public utils: UtilsService, private ns: NotificationsService) {}

  ngOnInit(): void {
    this.ns.observe().subscribe({
      next: (notifications) => {
        console.log('SUCCESS');
        this.error = null;
        this.allNotifications = notifications;
      },
      error: (err) => {
        console.log('ERROR');
        this.error = err;
        this.allNotifications = undefined;
      },
    });
  }

  markAsRead(notification: NotificationType) {
    notification.isRead = true;
    this.ns.updateNotification(notification);
  }
}
