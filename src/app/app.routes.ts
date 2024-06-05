import { Routes } from '@angular/router';
import { LayoutComponent as BasePagesLayoutComponent } from './views/base-pages/layout/layout.component';
import { NotFoundComponent } from './views/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: BasePagesLayoutComponent,
        children: [
            {
                title: 'Home',
                path: '',
                loadComponent: () => import('./views/base-pages/home/home.component').then((c) =>c.HomeComponent)
            }
        ]
    },
    {
        title: 'Not Found',
        path: '**',
        component: NotFoundComponent
    }
];
