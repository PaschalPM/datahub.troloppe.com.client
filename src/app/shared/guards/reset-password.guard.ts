import { CanActivateFn, Router } from '@angular/router';
import { EMAIL_FOR_RESET_PASSWORD } from '../constants';
import { inject } from '@angular/core';
import { ClientStorageService } from '../services/client-storage.service';

export const resetPasswordGuard: CanActivateFn = (route, state) => {
  const css = inject(ClientStorageService);
  const router = inject(Router);
  const token = route.queryParams['token'];
  const email = css.local().get(EMAIL_FOR_RESET_PASSWORD);

  console.log(email, 'FROM GUARD')
  if (token && email) {
    return true;
  }

  router.navigateByUrl('/');
  return false;
};
