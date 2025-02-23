import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MoviesService } from '../../../services/movies.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BillboardService } from '../../../services/billboard.service';
import { RoomsService } from '../../../services/rooms.service';
import { Room } from '../../../shared/interface/Room.interface';
import { ResponseG } from '../../../shared/interface/Response.interface';
import { Movie } from '../../../shared/interface/Movie.interface';
import { Billboard } from '../../../shared/interface/Billboard.interface';

@Component({
  selector: 'app-billboard-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditBillBoardComponent implements OnInit {
  protected billboardForm!: FormGroup;
  private activeId?: number;

  protected listOfRooms! : Room[];
  protected listOfMovies! : Movie[];

  constructor(
    private readonly _fb: FormBuilder,
    private readonly $movieService: MoviesService,
    private readonly $activeRoute: ActivatedRoute,
    private readonly $billboardService: BillboardService,
    private readonly $roomService : RoomsService,
    private readonly $router: Router
  ) {
    this.billboardForm = this._fb.group({
      movie: ['',Validators.required],
      room: ['',Validators.required],
      time: [0,[Validators.min(10)]],
    });

    this.$activeRoute.paramMap.subscribe((pathParams: any) => {
      if (pathParams.params.hasOwnProperty('id')) {
        this.activeId = pathParams.params.id;
      }
    });

    if (this.activeId) {
      $billboardService
        .getBillBoardById(this.activeId)
        .subscribe((billboard: Billboard | null) => {
          console.log(billboard)
          if (!billboard) {
            alert('No se encontro la pelicula');
          }
          delete billboard?.id;
          this.billboardForm.setValue({
           time:billboard?.time,
           movie:billboard?.movie.id,
           room:billboard?.sala.id
          });
        });
    }
  }


  ngOnInit(): void {
    this.$roomService.getAllRooms().subscribe((rooms:ResponseG<Room[]>)=>{
      this.listOfRooms = rooms.content;
    })
    this.$movieService.getListOfAllMovies().subscribe((movies:ResponseG<Movie[]>)=>{
      this.listOfMovies = movies.content;
    })
  }

  changeRoute(route: string) {
    this.$router.navigate([route]);
  }

  onSubmitBillBoard(){
      if (this.billboardForm.valid) {
        if (this.activeId) {
          this.$billboardService
            .updateBillBoard(this.activeId, this.billboardForm.value)
            .subscribe((response: any) => {
              if (response.id) {
                location.replace('/billboard');
              }
              if (response.error) {
                alert(response.error)
              }
            });
          return;
        }
  
        this.$billboardService
          .createBillBoard(this.billboardForm.value)
          .subscribe((response: any) => {
            if (response.id) {
              location.replace('/billboard');
            }
            if (response.error) {
              alert(response.error)
            }
          });
      }
  
  }
}
