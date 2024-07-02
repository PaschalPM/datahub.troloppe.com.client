import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ActiveLocationService } from '@services/active-location.service';
import { LoaderService } from '@services/loader.service';
import { PermissionService } from '@services/permission.service';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const newStreetDataFormGuard: CanActivateFn = (route, state) => {
  const currentPath = window.location.pathname;
  const activeLocationService = inject(ActiveLocationService);
  const router = inject(Router);
  const toaster = inject(ToastrService);
  const loader = inject(LoaderService);
  const permission = inject(PermissionService);

  console.log(state.url, currentPath);
  let subMsg = '';
  if (permission.isResearchStaff) {
    subMsg = ' Contact your upline.';
  }

  return activeLocationService.forGuard().pipe(
    tap({
      next: (value) => {
        if (!value) {
          toaster.error(`No active location set. ${subMsg}`, 'Error');
          router.navigateByUrl('/dashboard');
          loader.stop();
        }
      },
      error: (error) => {
        toaster.error(error.message);
        router.navigateByUrl(currentPath);
        loader.stop();
      },
    })
  );
};
