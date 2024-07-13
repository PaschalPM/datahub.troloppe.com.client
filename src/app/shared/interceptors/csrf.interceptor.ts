import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BASE_API_URL } from '../../configs/global';
import { switchMap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const cookiesService = inject(CookieService);
  const condition =
    ['POST', 'PUT', 'DELETE'].includes(req.method) 
    || req.url.includes('/api/notifications')
    || req.url.endsWith('/api/auth/user') 
    || req.url.includes('/api/street-data') 
    || req.url.includes('/api/locations/get-active-location') 
    

  if (condition) {
    return csrfRequest().pipe(
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
  }
  return next(req);
};

function csrfRequest() {
  const httpClient = inject(HttpClient);
  return httpClient.get(BASE_API_URL + '/sanctum/csrf-cookie', {
    withCredentials: true,
  });
}
