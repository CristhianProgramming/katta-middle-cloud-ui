import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { BillboardComponent } from './pages/billboard/home/billboard.component';
import { EditBillBoardComponent } from './pages/billboard/edit/edit.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { EditMoviesComponent } from './pages/movies/edit/edit.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        component: HomeComponent
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
        component: RoomsComponent
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
    }
];
