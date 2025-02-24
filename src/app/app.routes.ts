import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';
import { authChildsGuard } from './core/guards/auth-childs.guard';
export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'login',
        pathMatch: 'full',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        pathMatch: 'full',
        loadComponent: () => import('./pages/auth/login/login.component').then(m => m.LoginComponent)
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