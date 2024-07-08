import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/components/base-pages/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ColorSchemeService } from '@services/color-scheme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  template: `
    <div class="relative flex min-h-screen flex-col">
      <app-navbar></app-navbar>
      <main class="container mx-auto flex bg-lighter-blue grow flex-col px-2 py-4 lg:p-4">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
})
export class LayoutComponent {
  constructor(private colorScheme: ColorSchemeService) {}
  ngDoCheck(): void {
    this.colorScheme.reset();
  }
}
