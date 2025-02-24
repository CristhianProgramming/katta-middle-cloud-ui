import { Component, inject, OnInit } from '@angular/core';
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
      sala: ['',Validators.required],
      time: [0],
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
           sala:billboard?.sala.id
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

  async onSubmitBillBoard() {
    if (!this.billboardForm.valid) {
      console.error('Form is not valid');
      return;
    }

    try {
      const billboardData = this.billboardForm.value;
      const response = this.activeId
        ? await this.$billboardService.updateBillBoard(this.activeId, billboardData).toPromise()
        : await this.$billboardService.createBillBoard(billboardData).toPromise();
  
      if (response?.id) {
        location.replace('/billboard')
      } else if (response?.error) {
        alert(response.error); 
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred while processing your request. Please try again.');
    }
  }
}
