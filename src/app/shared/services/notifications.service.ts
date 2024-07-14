import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  interval,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrlFactory } from 'app/configs/global';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsObservable = new BehaviorSubject<
    NotificationType[] | undefined
  >(undefined);

  constructor(private httpClient: HttpClient, private loader: LoaderService) {}

  get notifications$() {
    return this.notificationsObservable.asObservable();
  }

  get unreadCount$() {
    return this.notificationsObservable
      .asObservable()
      .pipe(
        map((notifications) =>
          this.getUnreadCount(notifications as NotificationType[])
        )
      );
  }

  get count$() {
    return this.notificationsObservable
      .asObservable()
      .pipe(map((notifications) => notifications?.length));
  }

  fetchNotifications(): Observable<NotificationType[]> {
    return interval(1000 * 60 * 10).pipe(
      startWith(0),
      switchMap(() => {
        return this.httpClient
          .get<NotificationType[]>(apiUrlFactory('/notifications/all'))
          .pipe(
            tap({
              next: (value) => {
                this.notificationsObservable.next(value);
              },
              error: (err) => {
                this.notificationsObservable.error(err);
              },
            }),
            catchError((error) => {
              if (error.name === 'HttpErrorResponse') {
                return throwError(() => 'Oops! Network Error...');
              }
              return throwError(() => error);
            })
          );
      })
    );
  }

  updateNotification(notification: NotificationType) {
    this.loader.start();
    return this.httpClient
      .put<NotificationType>(apiUrlFactory('/notifications/mark-as-read'), {
        id: notification.id,
      })
      .pipe(
        tap({
          next: (value) => {
            const updatedNotifications =
              this.notificationsObservable.value?.map((notification) =>
                notification.id === value.id
                  ? { ...notification, is_read: true }
                  : notification
              );
            this.notificationsObservable.next(updatedNotifications);
            this.loader.stop();
          },
          error: (err) => {
            this.notificationsObservable.error(err);
            this.loader.stop();
          },
        })
      );
  }

  deleteAll() {
    this.loader.start();
    return this.httpClient
      .delete(apiUrlFactory('/notifications/delete-all'))
      .pipe(
        tap({
          next: () => {
            this.notificationsObservable.next([]);
            this.loader.stop();
          },
          error: (err) => {
            this.notificationsObservable.error(err);
            this.loader.stop();
          },
        })
      );
  }

  private getUnreadCount(notifications: NotificationType[]) {
    return notifications?.filter((value) => !value.is_read).length;
  }
}
