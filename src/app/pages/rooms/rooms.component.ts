import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../shared/interface/Room.interface';
import { ResponseG } from '../../shared/interface/Response.interface';
import { LoadingComponent } from "../../components/loading/loading.component";
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [LoadingComponent,RouterOutlet],
  templateUrl: './rooms.component.html',
  styleUrl: './rooms.component.scss'
})
export class RoomsComponent implements OnInit {


  protected listOfRooms! : Room[];

  constructor(private readonly $roomService: RoomsService,private readonly $router:Router){}

  ngOnInit(): void {
    this.$roomService.getAllRooms().subscribe((response:ResponseG<Room[]>)=>{
      this.listOfRooms = response.content;
    });
  }

  deleteFunction(arg0: number) {
    this.$roomService.deleteRoom(arg0).subscribe(location.reload)
  }

  editFunction(arg0: number) {
location.replace("/rooms/edit/"+arg0)
    }

}
