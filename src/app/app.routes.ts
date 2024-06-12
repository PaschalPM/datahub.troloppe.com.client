import { Routes } from '@angular/router';
import { LayoutComponent as BasePagesLayoutComponent } from './views/base-pages/layout/layout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LayoutComponent as AuthLayoutComponent } from './views/auth/layout/layout.component';
import { resetPasswordGuard } from './shared/guards/reset-password.guard';

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
    title: 'Not Found',
    path: '**',
    component: NotFoundComponent,
  },
];
