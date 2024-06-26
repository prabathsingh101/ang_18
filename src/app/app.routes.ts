import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { ImagesComponent } from './pages/images/images.component';
import { authGuard } from './pages/services/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch: 'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'',
        component:LayoutComponent,
        children: [
            {
                path:'dashboard', canActivate:[authGuard],
                component:DashboardComponent
            },
            {
              path:'users',
                component:UsersComponent
            },
            {
              path:'images', component: ImagesComponent
            }
        ]
    }
];
