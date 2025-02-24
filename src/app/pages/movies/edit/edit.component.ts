import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MoviesService } from '../../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from '../../../shared/interface/Movie.interface';
import { JwtServiceService } from '../../../services/jwt-service.service';
import { GENDERS } from '../../../shared/constants/Movie.Genders';
import { CLASIFICATION } from '../../../shared/constants/Movie.Clasification';

@Component({
  selector: 'app-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditMoviesComponent {
  protected movieForm!: FormGroup;
  protected listOfGenders = Object.values(GENDERS).filter(value=> typeof value === "string")
  protected listofClasifications = Object.values(CLASIFICATION).filter(value=> typeof value === "string")
  private activeId?: number;
  protected isAdminPanel : boolean = inject(JwtServiceService).isAdmin() ?? false;


  constructor(
    private readonly _fb: FormBuilder,
    private readonly $movieService: MoviesService,
    private readonly $activeRoute: ActivatedRoute,
    private readonly $router: Router
  ) {
    this.movieForm = this._fb.group({
      name: [''],
      description: [''],
      gender: [''],
      duration: [''],
      imageUrl: [''],
      classification: [''],
    });

    this.$activeRoute.paramMap.subscribe((pathParams: any) => {
      if (pathParams.params.hasOwnProperty('id')) {
        this.activeId = pathParams.params.id;
      }
    });

    if (this.activeId) {
      $movieService
        .getMovieById(this.activeId)
        .subscribe((movie: Movie | null) => {
          if (!movie) {
            alert('No se encontro la pelicula');
          }
          delete movie?.id;
          this.movieForm.setValue({
            ...movie,
          });
        });
    }
  }

  changeRoute(route: string) {
    this.$router.navigate([route]);
  }

  onSumitForm() {
    if (this.movieForm.valid) {
      if (this.activeId) {
        this.$movieService
          .updateMovie(this.activeId, this.movieForm.value)
          .subscribe((response: any) => {
            if (response.id) {
              location.replace('/movies');
            }
          });
        return;
      }

      this.$movieService
        .createMovie(this.movieForm.value)
        .subscribe((response: any) => {
          if (response.id) {
            location.replace('/movies');
          }
        });
    }
  }
}
