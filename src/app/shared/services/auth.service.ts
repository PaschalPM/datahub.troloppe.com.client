import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ClientStorageService } from './client-storage.service';
import { HttpClient } from '@angular/common/http';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { Auth } from '../interfaces/auth';
import { UserRoles } from '../enums/user-roles';

const API_AUTH_URL = BASE_API_URL + '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static CURRENT_USER_KEY = 'currentUser';
  private _currentUser!: User | null;

  // Getter to retrieve currently logged-in user
  get currentUser() {
    this._currentUser = this.css.local().get(AuthService.CURRENT_USER_KEY);
    return this._currentUser;
  }

  // Setter to set current user privately
  private set currentUser(value: User | null) {
    this._currentUser = value;
    if (value) {
      this.css.local().set(AuthService.CURRENT_USER_KEY, value);
    } else {
      this.css.local().remove(AuthService.CURRENT_USER_KEY);
    }
  }

  constructor(
    private css: ClientStorageService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    this.currentUser = this.css.local().get(AuthService.CURRENT_USER_KEY);
  }

  getLoggedInUser(): Observable<User> {
    return this.httpClient.get<User>(`${API_AUTH_URL}/user`, apiHttpOptions);
  }

  signIn(body: Pick<Auth, 'email' | 'password'>): Observable<User> {
    return this.httpClient
      .post<User>(`${API_AUTH_URL}/login`, body, apiHttpOptions)
      .pipe(
        tap((value) => {
          this.currentUser = value;
        })
      );
  }

  signOut(): Observable<{ message: string }> {
    return this.httpClient
      .delete<{ message: string }>(`${API_AUTH_URL}/logout`)
      .pipe(
        tap(() => {
          this.currentUser = null;
          this.router.navigateByUrl('/');
        })
      );
  }

  changePassword(
    body: Pick<Auth, 'email' | 'password'>
  ): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${API_AUTH_URL}/change-password`,
      body,
      apiHttpOptions
    );
  }

  forgotPassword(body: Pick<Auth, 'email'>): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${API_AUTH_URL}/forgot-password`,
      body,
      apiHttpOptions
    );
  }

  resetPassword(body: Auth): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(
      `${API_AUTH_URL}/reset-password`,
      body,
      apiHttpOptions
    );
  }

  // Checks if user has required roles to access some views
  isAuthorized(roles: `${UserRoles}`[]) {
    return roles.some((role) => this.currentUser?.roles.includes(role));
  }
}
