import { Injectable } from '@angular/core';
import { notifications as notificationFixtures } from '../../fixtures/notifications';
import {
  BehaviorSubject,
  Observable,
  delay,
  interval,
  map,
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // private notifications = notificationFixtures;
  private notifications: NotificationType[] = [];
  private notificationsObservable$ = new BehaviorSubject<
    NotificationType[] | undefined
  >(undefined);

  private _getNotifications() {
    return of(this.notifications).pipe(delay(1000));
  }

  constructor(private httpClient: HttpClient) {
  }
  
  public fetchNotifications() {
    interval(15000)
      .pipe(
        startWith(0),
        switchMap(() => {
          // return this._getNotifications();
          return this.httpClient.get<NotificationType[]>(
            'http://localhost:3000/notifications'
          );
        })
      )
      .subscribe((value) => {
        this.notifications = value;
        this.notificationsObservable$.next(value);
      });
  }

  observe() {
    return this.notificationsObservable$.asObservable();
  }

  updateNotification(updatedNotification: NotificationType) {
    this.notifications = this.notifications.map((notification) => {
      if (notification.id === updatedNotification.id) {
        return updatedNotification;
      }
      return notification;
    });
    this.httpClient
      .put(`http://localhost:3000/notifications/${updatedNotification.id}`, updatedNotification)
      .subscribe();

    this.notificationsObservable$.next(this.notifications);
  }
}
