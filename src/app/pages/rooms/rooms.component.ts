import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../shared/interface/Room.interface';
import { ResponseG } from '../../shared/interface/Response.interface';
import { LoadingComponent } from "../../components/loading/loading.component";

@Component({
  selector: 'app-rooms',
  imports: [LoadingComponent],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {

  protected listOfRooms! : Room[];

  constructor(private readonly $roomService: RoomsService){}

  ngOnInit(): void {
    this.$roomService.getAllRooms().subscribe((response:ResponseG<Room[]>)=>{
      this.listOfRooms = response.content;
    });
  }

}
