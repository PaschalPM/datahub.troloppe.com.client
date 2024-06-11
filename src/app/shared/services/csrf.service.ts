import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  csrfTokenEmitter = new EventEmitter<string>()
  crsfToken$ = this.csrfTokenEmitter.asObservable()
  
  constructor(
    private httpClient: HttpClient,
    private cookiesService: CookieService
  ) {}

  
  fetchToken() {
    this.httpClient
      .get(BASE_API_URL + '/sanctum/csrf-cookie', {
        ...apiHttpOptions,
        withCredentials: true,
        observe: 'response',
      })
      .subscribe({
        next: () => {
          const token = this.cookiesService.get('XSRF-TOKEN');
          this.csrfTokenEmitter.emit(token)
        },
      });
  
  }
}
