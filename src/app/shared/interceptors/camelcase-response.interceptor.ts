import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import camelcaseKeys from 'camelcase-keys';
import { map } from 'rxjs';

export const camelcaseResponseInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    map((event) => {
      if (
        event instanceof HttpResponse &&
        (!event.url?.includes('api/street-data') ||
          event.url?.includes('api/street-data/overview'))
      ) {
        return event.clone({
          body: camelcaseKeys(event.body as any),
        });
      }
      return event;
    })
  );
};
