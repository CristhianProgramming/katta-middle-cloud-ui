import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RequestReservation } from '../shared/interface/Reservation.interface';
import { JwtServiceService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private readonly $http:HttpClient,private readonly $jwtService : JwtServiceService) { }

  getAllReservations(id :number){
    return this.$http.get("/user/reservations/"+id);
  }

  getAllReservationOfUser(){
   const email = this.$jwtService.obtainRolOfUser().payload.sub;
    return this.$http.get("/user/reservations/user/"+email);
  }

  deleteReservation(id:number){
    return this.$http.delete("/user/reservations/"+id);

  }

  sendRequestSeats(request : RequestReservation) {
    return this.$http.post("/user/reservations",{
      ...request,
      reservator: this.$jwtService.obtainRolOfUser().payload.sub
    });
  }


}
