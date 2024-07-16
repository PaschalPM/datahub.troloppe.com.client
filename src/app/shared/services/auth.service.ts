import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientStorageService } from './client-storage.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { apiHttpOptions, apiUrlFactory } from '../../configs/global';
import { User as UserType } from '../types/user';
import { CURRENT_USER_STORE_KEY } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser$ = new BehaviorSubject<UserType | null>(null);

  // Observable to retrieve currently logged-in user
  onCurrentUser() {
    return this.currentUser$.asObservable();
  }

  constructor(
    private css: ClientStorageService,
    private httpClient: HttpClient
  ) {
    this.currentUser$.next(this.css.local().get(CURRENT_USER_STORE_KEY));
  }

  getLoggedInUser(): Observable<UserType> {
    return this.httpClient
      .get<UserType>(apiUrlFactory('/auth/user'), apiHttpOptions)
      .pipe(
        tap({
          next: (value) => {
            this.setAndEmitCurrentUser(value);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.setAndEmitCurrentUser(null);
            }
          },
        })
      );
  }

  verifyUserByEmail(body: Pick<AuthType, 'email'>): Observable<void> {
    return this.httpClient.post<void>(
      apiUrlFactory('/auth/verify-user-by-email'),
      body,
      apiHttpOptions
    );
  }

  signIn(body: Pick<AuthType, 'email' | 'password'>): Observable<UserType> {
    return this.httpClient
      .post<UserType>(apiUrlFactory('/auth/login'), body, apiHttpOptions)
      .pipe(
        tap((value) => {
          this.setAndEmitCurrentUser(value);
        })
      );
  }

  signOutOnClient() {
    this.setAndEmitCurrentUser(null);
  }
  
  signOut(): Observable<{ message: string }> {
    return this.httpClient
      .delete<{ message: string }>(apiUrlFactory('/auth/logout'))
      .pipe(
        tap(() => {
          this.setAndEmitCurrentUser(null);
        })
      );
  }

  changePassword(
    body: Pick<AuthType, 'email' | 'password'>
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      apiUrlFactory('/auth/change-password'),
      body,
      apiHttpOptions
    );
  }

  forgotPassword(
    body: Pick<AuthType, 'email'>
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      apiUrlFactory('/auth/forgot-password'),
      body,
      apiHttpOptions
    );
  }

  resetPassword(body: AuthType): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      apiUrlFactory('/auth/reset-password'),
      body,
      apiHttpOptions
    );
  }

  /**
   * Sets the Current User instance to localstorage and emits a current user event.
   * If null is passed in, it deletes instance from localstorage and emits null
   * @param value
   */
  private setAndEmitCurrentUser(value: UserType | null) {
    if (value) {
      this.css.local().set(CURRENT_USER_STORE_KEY, value);
    } else {
      this.css.local().remove(CURRENT_USER_STORE_KEY);
    }
    this.currentUser$.next(value);
  }
}
