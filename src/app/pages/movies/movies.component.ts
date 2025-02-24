import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Movie } from '../../shared/interface/Movie.interface';
import { MoviesService } from '../../services/movies.service';
import { ResponseG } from '../../shared/interface/Response.interface';
import { CardComponent } from "../../components/card/card.component";
import { LoadingComponent } from "../../components/loading/loading.component";
import { JwtServiceService } from '../../services/jwt-service.service';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet, CardComponent, LoadingComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent  {

  protected listOfMovies! : Movie[];
  protected isAdminPanel : boolean = inject(JwtServiceService).isAdmin() ?? false;

  constructor(private readonly $movieService : MoviesService,private readonly $router : Router){}

  ngOnInit(): void {
    this.$movieService.getListOfAllMovies().subscribe((x:ResponseG<Movie[]>)=>{
      this.listOfMovies = x.content
    })
  }

  deleteMovie(id:number){
    this.$movieService.deleteMovie(id).subscribe((response:any)=>{
      if (!response) {
        location.reload()
      }
    })
  }

  editMovie(id:number){
    this.$router.navigate(["movies/edit/"+id])
  }

}
