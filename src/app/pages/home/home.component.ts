import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { MoviesService } from '../../services/movies.service';
import { ResponseG } from '../../shared/interface/Response.interface';
import { Movie } from '../../shared/interface/Movie.interface';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent,LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  protected listOfMovies! : Movie[];

  constructor(private readonly $movieService : MoviesService){}

  ngOnInit(): void {
    this.$movieService.getListOfAllMovies().subscribe((x:ResponseG<Movie[]>)=>{
      this.listOfMovies = x.content
    })
  }

}
