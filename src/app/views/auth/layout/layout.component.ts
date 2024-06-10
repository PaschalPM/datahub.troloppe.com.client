import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'auth-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <main
      class="flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-lighter-blue"
    >
      <div class="flex w-full grow justify-center px-2 lg:px-0">
        <router-outlet></router-outlet>
      </div>
      <span class="py-2 text-xs text-text-color lg:text-sm">
        © 2024, Troloppe Property Services. All Rights Reserved.
      </span>
    </main>
  `,
})
export class LayoutComponent {}
