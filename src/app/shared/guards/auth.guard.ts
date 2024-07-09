import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, switchMap, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.onCurrentUser().pipe(
    tap((currentUser) => {
      if (currentUser) {
        router.navigateByUrl('/dashboard');
      }
    }),
    switchMap((currentUser) => {
      return currentUser ? of(false) : of(true);
    })
  );
};
