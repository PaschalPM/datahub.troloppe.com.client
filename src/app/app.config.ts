import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
;
import { csrfInterceptor } from '@interceptors/csrf.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        csrfInterceptor,
      ])
    ),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    }),
  ],
};
