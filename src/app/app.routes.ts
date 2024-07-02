import { Routes } from '@angular/router';
import { LayoutComponent as BasePagesLayoutComponent } from './views/base-pages/layout/layout.component';
import { LayoutComponent as AuthLayoutComponent } from './views/auth/layout/layout.component';
import { LayoutComponent as DashboardLayoutComponent } from './views/dashboard/layout/layout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { resetPasswordGuard } from './shared/guards/reset-password.guard';
import { dashboardGuard } from './shared/guards/dashboard.guard';
import { authGuard } from './shared/guards/auth.guard';
import { StreetDataComponent } from './views/dashboard/street-data/street-data.component';
import { newStreetDataFormGuard } from '@guards/new-street-data-form.guard';

export const routes: Routes = [
  {
    path: '',
    component: BasePagesLayoutComponent,
    children: [
      {
        title: 'Home',
        path: '',
        loadComponent: () =>
          import('./views/base-pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        title: 'About',
        path: 'about',
        loadComponent: () =>
          import('./views/base-pages/about/about.component').then(
            (c) => c.AboutComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        title: 'Sign In',
        path: 'sign-in',
        loadComponent: () =>
          import('./views/auth/sign-in/sign-in.component').then(
            (c) => c.SignInComponent
          ),
      },
      {
        title: 'Forgot Password',
        path: 'forgot-password',
        loadComponent: () =>
          import('./views/auth/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
      },
      {
        title: 'Reset Password',
        path: 'reset-password',
        canActivate: [resetPasswordGuard],
        loadComponent: () =>
          import('./views/auth/reset-password/reset-password.component').then(
            (c) => c.ResetPasswordComponent
          ),
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [dashboardGuard],
    children: [
      {
        title: 'Home',
        path: '',
        loadComponent: () =>
          import('./views/dashboard/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        title: 'Street Data',
        path: 'street-data',
        loadComponent: () =>
          import('./views/dashboard/street-data/street-data.component').then(
            (c) => c.StreetDataComponent,
          ),
      },
      {
        title: 'Create Street Data',
        path: 'street-data/new',
        canActivate: [newStreetDataFormGuard],
        loadComponent: () =>
          import('./views/dashboard/new-street-data/new-street-data.component').then(
            (c) => c.NewStreetDataComponent,
          ),
      },
      {
        title: 'Street Data',
        path: 'street-data/:id',
        loadComponent: () =>
          import('./views/dashboard/view-street-data/view-street-data.component').then(
            (c) => c.ViewStreetDataComponent,
          ),
      },
      {
        title: 'Edit Street Data',
        path: 'street-data/edit/:id',
        loadComponent: () =>
          import('./views/dashboard/edit-street-data/edit-street-data.component').then(
            (c) => c.EditStreetDataComponent,
          ),
      },
      {
        title: 'Notifications',
        path: 'notifications',
        loadComponent: () =>
          import(
            './views/dashboard/notifications/notifications.component'
          ).then((c) => c.NotificationsComponent),
      },
    ],
  },
  {
    title: 'Not Found',
    path: '**',
    component: NotFoundComponent,
  },
];
