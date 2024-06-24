import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AppEventEmitterService } from '../../../services/app-event-emitter.service';
import { SigninOrDashboardLinkComponent } from '../signin-or-dashboard-link/signin-or-dashboard-link.component';
import { HamburgerIconComponent } from '../../../svgs/base-pages/hamburger-icon.component';
import { ExitIconComponent } from '../../svgs/exit-icon.component';
import { NgIf } from '@angular/common';
import { MenuDrawerComponent } from '../menu-drawer/menu-drawer.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, MenuDrawerComponent, RouterModule, SigninOrDashboardLinkComponent, HamburgerIconComponent, ExitIconComponent],
  template: `
    <div class="">
      <nav
        class="container relative z-10 mx-auto flex items-center justify-between bg-white px-2 py-4 lg:p-4"
      >
        <img src="assets/Logo.svg" alt="logo" />
        <ul class="hidden md:inline-block">
          <li
            class="inline font-medium text-light-blue"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <a routerLink="/"> Home </a>
          </li>
          <li
            class="ml-6 inline font-medium text-light-blue"
            routerLinkActive="active"
          >
            <a routerLink="/about"> About </a>
          </li>
        </ul>
        <div class="hidden font-medium text-light-blue md:inline-block">
          <signin-or-dashboard-link
            [signInOrDashboard]="signInOrDashboard"
          ></signin-or-dashboard-link>
        </div>
        <button
          class="md:hidden"
          (click)="isMenuDrawerOpen = !isMenuDrawerOpen"
        >
          <hamburger-icon *ngIf="!isMenuDrawerOpen"></hamburger-icon>
          <exit-icon *ngIf="isMenuDrawerOpen"></exit-icon>
        </button>
      </nav>
      <menu-drawer [isMenuDrawerOpen]="isMenuDrawerOpen"></menu-drawer>
    </div>
  `,
})
export class NavbarComponent {
  signInOrDashboard: 'sign-in' | 'dashboard' = 'sign-in';
  isMenuDrawerOpen = false;

  constructor(
    private appEventEmitter: AppEventEmitterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appEventEmitter.listen<'sign-in' | 'dashboard'>(
      'signInOrDashboardEvent',
      (event) => {
        this.signInOrDashboard = event;
      }
    );

    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationEnd) {
          this.isMenuDrawerOpen = false;
        }
      },
    });
  }
}
