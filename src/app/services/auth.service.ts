import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly $http : HttpClient) { }

  loginUser(payload:{username:string,password:string}){
    return this.$http.post("/auth/login",payload);
  }

  registerUser(payload:{username:string,password:string}){
    return this.$http.post("/auth/register",payload);
  }

}
