import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientStorageService } from './client-storage.service';
import { HttpClient } from '@angular/common/http';
import { apiHttpOptions, apiUrlFactory } from '../../configs/global';
import { User as UserType } from '../types/user';
import { CURRENT_USER_STORE_KEY } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _currentUser$ = new BehaviorSubject<UserType | null>(null);

  // Getter to retrieve currently logged-in user
  currentUser() {
    return this._currentUser$.asObservable();
  }

  // Setter to set current user privately
  private setCurrentUser(value: UserType | null) {
    if (value) {
      this.css.local().set(CURRENT_USER_STORE_KEY, value);
    } else {
      this.css.local().remove(CURRENT_USER_STORE_KEY);
    }
    this._currentUser$.next(value);
  }

  constructor(
    private css: ClientStorageService,
    private httpClient: HttpClient
  ) {
    this._currentUser$.next(this.css.local().get(CURRENT_USER_STORE_KEY));
  }

  getLoggedInUser(): Observable<UserType> {
    return this.httpClient.get<UserType>(
      apiUrlFactory('/auth/user'),
      apiHttpOptions
    );
  }

  verifyUserByEmail(body: Pick<AuthType, 'email'>): Observable<void> {
    return this.httpClient.post<void>(
      apiUrlFactory('/auth/verify-user'),
      body,
      apiHttpOptions
    );
  }

  signIn(body: Pick<AuthType, 'email' | 'password'>): Observable<UserType> {
    return this.httpClient
      .post<UserType>(apiUrlFactory('/auth/login'), body, apiHttpOptions)
      .pipe(
        tap((value) => {
          this.setCurrentUser(value)
        })
      );
  }

  signOutOnClient() {
    this.setCurrentUser(null)
  }

  signOut(): Observable<{ message: string }> {
    return this.httpClient
      .delete<{ message: string }>(apiUrlFactory('/auth/logout'))
      .pipe(
        tap(() => {
          this.setCurrentUser(null)
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
}
