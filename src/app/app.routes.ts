import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authChildsGuard } from './core/guards/auth-childs.guard';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path: 'reservation/:billboard',
        pathMatch: 'full',
        loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent),
        canActivate: [authGuard]
    },
    {
        path: 'movies',
        loadComponent: () => import('./pages/movies/movies.component').then(m => m.MoviesComponent),
        canActivateChild: [authChildsGuard],
        children: [
            {
                path: 'edit',
                loadComponent: () => import('./pages/movies/edit/edit.component').then(m => m.EditMoviesComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/movies/edit/edit.component').then(m => m.EditMoviesComponent)
            }
        ]
    },
    {
        path: 'rooms',
        loadComponent: () => import('./pages/rooms/rooms.component').then(m => m.RoomsComponent),
        canActivateChild: [authChildsGuard],
        children: [
            {
                path: 'edit',
                loadComponent: () => import('./pages/rooms/edit-rooms/edit-rooms.component').then(m => m.EditRoomsComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/rooms/edit-rooms/edit-rooms.component').then(m => m.EditRoomsComponent)
            }
        ]
    },
    {
        path: 'billboard',
        loadComponent: () => import('./pages/billboard/home/billboard.component').then(m => m.BillboardComponent),
        canActivateChild: [authChildsGuard],
        children: [
            {
                path: 'edit',
                loadComponent: () => import('./pages/billboard/edit/edit.component').then(m => m.EditBillBoardComponent)
            },
            {
                path: 'edit/:id',
                loadComponent: () => import('./pages/billboard/edit/edit.component').then(m => m.EditBillBoardComponent)
            }
        ]
    },
    { path: '**', redirectTo: '' }
];