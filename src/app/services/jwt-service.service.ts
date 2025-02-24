import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  private token : string | null = localStorage.getItem('token');

  constructor() { }

  obtainRolOfUser(): any {
    const base64UrlDecode = (str: string) => {
      return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
    };
  
    if (!this.token) {
      return;
    }
    const [header, payload] = this.token.split('.').slice(0, 2);


    return { payload: base64UrlDecode(payload)}
  }
  
}
