import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';
import { CookieService } from 'ngx-cookie-service';
import { switchMap } from 'rxjs';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookieService);

  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    csrfRequest().pipe(
      switchMap(() => {
        const token = cookiesService.get('XSRF-TOKEN');
        if (token) {
          const modifiedReq = req.clone({
            headers: req.headers.set('X-XSRF-TOKEN', token),
            withCredentials: true,
          });

          return next(modifiedReq);
        }
        return next(req);
      })
    );
    return next(req);
  }
  return next(req);
};

function csrfRequest() {
  const httpClient = inject(HttpClient);
  return httpClient.get(BASE_API_URL + '/sanctum/csrf-cookie', apiHttpOptions);
}
