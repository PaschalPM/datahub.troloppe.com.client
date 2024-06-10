import { Routes } from '@angular/router';
import { LayoutComponent as BasePagesLayoutComponent } from './views/base-pages/layout/layout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { LayoutComponent as AuthLayoutComponent } from './views/auth/layout/layout.component';

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
    ],
  },
  {
    title: 'Not Found',
    path: '**',
    component: NotFoundComponent,
  },
];
