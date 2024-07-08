import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  interval,
  Observable,
  startWith,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrlFactory } from 'app/configs/global';
import { UtilsService } from './utils.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private notificationsObservable$ = new BehaviorSubject<
    NotificationType[] | undefined
  >(undefined);

  private unnotificationsCountObservable$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient, private loader: LoaderService) {}

  observe() {
    return this.notificationsObservable$.asObservable();
  }
  
  get unreadCount() {
    return this.unnotificationsCountObservable$.asObservable();
  }

  private getUnreadCount(notifications: NotificationType[]){
    return notifications?.filter((value) => !value.isRead).length
  }

  public fetchNotifications(): Observable<NotificationType[]> {
    return interval(1000 * 60 * 10).pipe(
      startWith(0),
      switchMap(() => {
        return this.httpClient
          .get<NotificationType[]>(apiUrlFactory('/notifications/all'))
          .pipe(
            tap({
              next: (value) => {
                this.notificationsObservable$.next(value);
                this.unnotificationsCountObservable$.next(this.getUnreadCount(value))
              },
              error: (err) => {
                this.notificationsObservable$.error(err);
                this.unnotificationsCountObservable$.next(0)
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
      .put<NotificationType[]>(apiUrlFactory('/notifications/mark-as-read'), {
        id: notification.id,
      })
      .pipe(
        tap({
          next: (value) => {
            this.notificationsObservable$.next(value);
            this.unnotificationsCountObservable$.next(this.getUnreadCount(value))
            this.loader.stop();
          },
          error: (err) => {
            this.notificationsObservable$.error(err);
            this.unnotificationsCountObservable$.next(0)
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
            this.notificationsObservable$.next([]);
            this.loader.stop();
          },
          error: (err) => {
            this.notificationsObservable$.error(err);
            this.loader.stop();
          },
        })
      );
  }
}
