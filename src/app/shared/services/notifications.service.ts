import { Injectable } from '@angular/core';
import { notifications as notificationFixtures } from '../../fixtures/notifications';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  notifications: NotificationType[] = notificationFixtures

  get unreadNotifications() {
    return this.notifications.filter((value) => !value.isRead);
  }

  get allNotificationSize() {
    return this.notifications.length;
  }

  get unreadNotificationSize() {
    return this.unreadNotifications.length;
  }

  constructor() {}

  markAsRead(notificationId: number) {
    this.notifications = this.notifications.map((notification) => {
      if (notification.notificationId === notificationId) {
        notification.isRead = true;
      }
      return notification;
    });
    console.log(this.notifications);
  }
}
