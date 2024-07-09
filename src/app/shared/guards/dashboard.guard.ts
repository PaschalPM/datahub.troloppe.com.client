import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, of, switchMap, tap, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LoaderService } from '@services/loader.service';
import { ToastrService } from 'ngx-toastr';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loader = inject(LoaderService);
  const toastr = inject(ToastrService);

  return authService.getLoggedInUser().pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        toastr.error('Session Logged Out.', 'Error');
        router.navigate(['/sign-in'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
        loader.stop();
        return of(null);
      }
      return throwError(() => err);
    }),
    switchMap(() => {
      loader.stop();
      return of(true);
    })
  );
};
