import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { BillboardComponent } from './pages/billboard/home/billboard.component';
import { EditBillBoardComponent } from './pages/billboard/edit/edit.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { EditMoviesComponent } from './pages/movies/edit/edit.component';
import { EditRoomsComponent } from './pages/rooms/edit-rooms/edit-rooms.component';
import { LoginComponent } from './pages/auth/login/login.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component: HomeComponent
    },
    {
        path:'login',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path:'register',
        pathMatch: 'full',
        component: LoginComponent
    },
    {
        path:'movies',
        component: MoviesComponent,
        children: [
            {
                path: 'edit',
                component: EditMoviesComponent
            },
            {
                path: 'edit/:id',
                component: EditMoviesComponent
            }
        ]
    },
    {
        path:'rooms',
        component: RoomsComponent,
        children: [
            {
                path: 'edit',
                component: EditRoomsComponent
            },
            {
                path: 'edit/:id',
                component: EditRoomsComponent
            }
        ]
    },
    {
        path: 'billboard',
        component: BillboardComponent,
        children: [
            {
                path: 'edit',
                component: EditBillBoardComponent
            },
            {
                path: 'edit/:id',
                component: EditBillBoardComponent
            }
        ]
    },
    {path:'**',redirectTo:''}
];
