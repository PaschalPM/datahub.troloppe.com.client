import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { csrfInterceptor } from './shared/interceptors/csrf.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { responseInterceptor } from './shared/interceptors/response.interceptor';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([csrfInterceptor, responseInterceptor])),
    provideAnimationsAsync(),
    provideToastr({
      closeButton: true,
      positionClass: 'toast-bottom-left',
      preventDuplicates: true,
    })
  ],
};
