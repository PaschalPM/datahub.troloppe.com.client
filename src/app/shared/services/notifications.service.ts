import { Injectable } from '@angular/core';
import { notifications as notificationFixtures } from '../../fixtures/notifications';
import {
  BehaviorSubject,
  catchError,
  delay,
  interval,
  of,
  startWith,
  switchMap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  // private notifications = notificationFixtures;
  private notifications: NotificationType[] | undefined = [];
  private notificationsObservable$ = new BehaviorSubject<
    NotificationType[] | undefined
  >(undefined);


  constructor(private httpClient: HttpClient) {}

  public fetchNotifications() {
    return interval(1000 * 60 * 10)
      .pipe(
        startWith(0),
        switchMap(() => {
          return this.httpClient
            .get<NotificationType[]>('http://localhost:3000/notifications')
            .pipe(
              catchError((error) => {
                if (error.name === 'HttpErrorResponse') {
                  return throwError(() => 'Oops! Network Error...');
                }
                return throwError(() => error);
              })
            );
        })
      )
      .subscribe({
        next: (value) => {
          this.notifications = value;
          this.notificationsObservable$.next(value);
        },
        error: (err) => {
          this.notifications = undefined
          this.notificationsObservable$.error(err);
        }
      });
  }

  observe() {
    return this.notificationsObservable$.asObservable();
  }

  updateNotification(updatedNotification: NotificationType) {
    this.notifications = this.notifications?.map((notification) => {
      if (notification.id === updatedNotification.id) {
        return updatedNotification;
      }
      return notification;
    });
    this.httpClient
      .put(
        `http://localhost:3000/notifications/${updatedNotification.id}`,
        updatedNotification
      )
      .subscribe();

    this.notificationsObservable$.next(this.notifications);
  }
}
