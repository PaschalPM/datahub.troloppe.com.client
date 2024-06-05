import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
     <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="text-center">
        <h1 class="text-9xl font-bold text-gray-900">404</h1>
        <p class="text-2xl font-semibold text-gray-700 mt-4">Oops! Page Not Found</p>
        <p class="text-gray-500 mt-2">The page you are looking for doesn't exist or an other error occurred.</p>
        <a routerLink="/" class="mt-6 inline-block px-5 py-3 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500">
          Go back home
        </a>
      </div>
    </div>
  `,
  styles: ``
})
export class NotFoundComponent {

}
