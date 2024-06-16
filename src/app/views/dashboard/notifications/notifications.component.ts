import { Component } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { NotificationItemComponent } from '../../../shared/components/dashboard/notification-item/notification-item.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PaneNavigatorPanelComponent } from '../../../shared/components/pane-navigator-panel/pane-navigator-panel.component';
import { Observable, delay, map, of } from 'rxjs';
import { SpinnerComponent } from '../../../shared/components/svgs/spinner.component';

type PaneType = 'unreadNotification' | 'allNotifications';

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
  allNotifications: NotificationType[] | undefined = undefined

  get unreadNotifications(): NotificationType[] | undefined {
    return this.allNotifications?.filter((value) => !value.isRead);
  }

  private get allNotificationSum(): number {
    const allNotifications =  this.allNotifications;
    return allNotifications ? allNotifications.length : 0
  }

  private get unreadNotificationSum(): number {
    const unreadNotifications =  this.unreadNotifications;
    return unreadNotifications ? unreadNotifications.length : 0
  }


  activePane: PaneType = 'unreadNotification';

  get tabs() {
    return [
      {
        pane: 'unreadNotification',
        tabLabel: `Unread (${this.unreadNotificationSum})`,
      },
      {
        pane: 'allNotifications',
        tabLabel: `All (${this.allNotificationSum})`,
      },
    ];
  }

  constructor(public utils: UtilsService, private ns: NotificationsService) {}

  ngOnInit(): void {
    this.ns.observe().subscribe((notifications) => {
      this.allNotifications = notifications
    })
  }

  markAsRead(notification: NotificationType) {
    notification.isRead = true;
    this.ns.updateNotification(notification)
  }
}
