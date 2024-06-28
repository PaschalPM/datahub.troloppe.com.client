import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ClientStorageService } from './client-storage.service';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';
import { User as UserType } from '../types/user';
import { CURRENT_USER_STORE_KEY } from '../constants';

const API_AUTH_URL = BASE_API_URL + '/auth';

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
      `${API_AUTH_URL}/user`,
      apiHttpOptions
    );
  }

  verifyUserByEmail(body: Pick<AuthType, 'email'>): Observable<void> {
    return this.httpClient.post<void>(
      `${API_AUTH_URL}/verify-user`,
      body,
      apiHttpOptions
    );
  }

  signIn(body: Pick<AuthType, 'email' | 'password'>): Observable<UserType> {
    return this.httpClient
      .post<UserType>(`${API_AUTH_URL}/login`, body, apiHttpOptions)
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
      .delete<{ message: string }>(`${API_AUTH_URL}/logout`)
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
      `${API_AUTH_URL}/change-password`,
      body,
      apiHttpOptions
    );
  }

  forgotPassword(
    body: Pick<AuthType, 'email'>
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${API_AUTH_URL}/forgot-password`,
      body,
      apiHttpOptions
    );
  }

  resetPassword(body: AuthType): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${API_AUTH_URL}/reset-password`,
      body,
      apiHttpOptions
    );
  }
}
