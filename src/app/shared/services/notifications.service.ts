import { Injectable } from '@angular/core';
import { notifications as notificationFixtures } from '../../fixtures/notifications';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notifications: NotificationType[] = [];
  private getNotifications(): Observable<NotificationType[]> {
    return of(notificationFixtures).pipe(delay(1000));
  }

  private allNotificationsObservable = new BehaviorSubject<NotificationType[]>(
    this.notifications
  );
  private unreadNotificationsObservable = this.allNotificationsObservable.pipe(
    map((value) => value.filter((value) => !value.isRead))
  );

  get allNotifications$(){
    return this.allNotificationsObservable.asObservable()
  }
  get unreadNotifications$(){
    return this.unreadNotificationsObservable
  }
  constructor() {
    this.getNotifications().subscribe((value) => {
      this.notifications = value;
      this.allNotificationsObservable.next(this.notifications);
    });
  }

  markAsRead(notificationId: number) {
    this.allNotificationsObservable.next(
      this.notifications.map((notification) => {
        if (notificationId === notification.id) {
          notification.isRead = true;
        }
        return notification;
      })
    );
  }
}
