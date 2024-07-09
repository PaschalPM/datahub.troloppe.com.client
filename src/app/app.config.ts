import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
;
import { csrfInterceptor } from '@interceptors/csrf.interceptor';
import { cacheResponseInterceptor } from '@interceptors/cache-response.interceptor';
import { camelcaseResponseInterceptor } from '@interceptors/camelcase-response.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        csrfInterceptor,
        cacheResponseInterceptor,
        camelcaseResponseInterceptor
      ])
    ),
    provideAnimationsAsync(),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
  ],
};
