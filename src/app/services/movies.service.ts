import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../shared/interface/Movie.interface';
import { ResponseG } from '../shared/interface/Response.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private readonly $http: HttpClient) {}

  getListOfAllMovies(): Observable<ResponseG<Movie[]>> {
    return this.$http.get<ResponseG<Movie[]>>('/movies');
  }

  getMovieById(idMovie: number) : Observable<Movie>{
    return this.$http.get<Movie>('/movies/'+idMovie);
  }

  createMovie(requestBody : Movie) : Observable<Movie>{
    return this.$http.post<Movie>('/movies',requestBody);
  }
  
  updateMovie(idMovie : number,requestBody : Movie) : Observable<Movie>{
    return this.$http.put<Movie>('/movies/'+idMovie,requestBody);
  }
  
  deleteMovie(idMovie : number) : Observable<void>{
    return this.$http.delete<void>('/movies/'+idMovie);
  }

}
