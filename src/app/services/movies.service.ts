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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.$http.get<ResponseG<Movie[]>>('http://localhost:8080/api/v1/movies', {
      headers,
      withCredentials: true,
    });
  }
}
