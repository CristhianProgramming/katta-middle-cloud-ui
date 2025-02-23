import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseG } from '../shared/interface/Response.interface';
import { Room } from '../shared/interface/Room.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private readonly $http:HttpClient) { }

  getAllRooms() : Observable<ResponseG<Room[]>>{
    return this.$http.get<ResponseG<Room[]>>("/rooms");
  }

  getRoomDetails(idRoom:number) : Observable<Room>{
    return this.$http.get<Room>("/rooms/"+idRoom);
  }
  
  createRoom(requestBody: Room) : Observable<Room>{
    return this.$http.post<Room>("/rooms",requestBody);
  }
  
  updateRoom(idRoom: number , requestBody: Room) : Observable<Room>{
    return this.$http.put<Room>("/rooms"+idRoom,requestBody);
  }

  deleteRoom(idRoom: number) : Observable<void>{
    return this.$http.delete<void>("/rooms/"+idRoom);
  }

}
