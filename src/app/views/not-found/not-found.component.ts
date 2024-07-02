import { NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <div
      [class]="
        utils.cn('min-h-screen flex items-center justify-center bg-gray-100', {
          'min-h-full bg-transparent': insideDashboardView
        })
      "
    >
      <div class="text-center">
        <h1
          [class]="
            utils.cn('text-9xl font-bold text-gray-900', {
              'dark:text-slate-500': insideDashboardView
            })
          "
        >
          404
        </h1>
        <p
          [class]="
            utils.cn('text-2xl font-semibold text-gray-700 mt-4', {
              'dark:text-gray-400': insideDashboardView
            })
          "
        >
          Oops! {{ resourceName || 'Page' }} Not Found
        </p>
        <p class="text-gray-500 mt-2" *ngIf="!insideDashboardView">
          The page you are looking for doesn't exist or an other error occurred.
        </p>
        <a
          *ngIf="!insideDashboardView"
          routerLink="/"
          class="mt-6 inline-block px-5 py-3 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500"
        >
          Go back home
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  @Input() insideDashboardView = false;
  @Input() resourceName = '';
  utils = inject(UtilsService);
}
