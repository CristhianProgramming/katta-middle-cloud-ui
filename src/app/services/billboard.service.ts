import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Billboard } from '../shared/interface/Billboard.interface';

@Injectable({
  providedIn: 'root',
})
export class BillboardService {
  constructor(private readonly $http: HttpClient) {}

  getListOfAllBillboards(): Observable<any> {
    return this.$http.get<any>('/reservations');
  }

  getBillBoardById(idBillboard:number): Observable<any> {
    return this.$http.get<any>('/reservations/'+idBillboard);
  }

  createBillBoard(requestBody:Billboard): Observable<any> {
    return this.$http.post<any>('/reservations',requestBody);
  }

  updateBillBoard(idBillboard:number ,requestBody : Billboard): Observable<any> {
    return this.$http.put<any>('/reservations/'+idBillboard,requestBody);
  }

  deleteBillBoard(idBillboard:number): Observable<any> {
    return this.$http.delete<any>('/reservations/'+idBillboard);
  }
}
