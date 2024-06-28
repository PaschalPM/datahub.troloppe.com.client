import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, switchMap, tap } from 'rxjs';

export const dashboardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser().pipe(
    tap((currentUser) => {
      if (!currentUser) {
        router.navigate(['/sign-in'], {
          queryParams: {
            returnUrl: state.url,
          },
        });
      }
    }),
    switchMap((currentUser) => {
      return currentUser ? of(true) : of(false);
    })
  );
};
