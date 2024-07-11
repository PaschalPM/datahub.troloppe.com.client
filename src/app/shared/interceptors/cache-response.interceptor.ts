import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpRequestCacheService } from '@services/http-request-cache.service';
import { of, tap } from 'rxjs';

export const cacheResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const reqCacheService = inject(HttpRequestCacheService);

  const conditions =
    req.method === 'GET' && req.url.endsWith('/api/street-data');

  if (conditions) {
    const cachedResponse = reqCacheService.get(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }
    return next(req).pipe(
      tap((res) => {
        if (res instanceof HttpResponse) {
          reqCacheService.put(req.url, res);
        }
      })
    );
  }
  return next(req);
};
