import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  private token : string | null = localStorage.getItem('token');

  constructor() { }

 public  obtainRolOfUser(): any {
    const base64UrlDecode = (str: string) => {
      return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')));
    };
  
    if (!this.token) {
      return;
    }
    const [header, payload] = this.token.split('.').slice(0, 2);
    return { payload: base64UrlDecode(payload)}
  }

  public isAdmin(): boolean {
    const rols = this.obtainRolOfUser()?.payload?.Rol?.userRols ?? []
    console.log("ROLS",rols)
    return rols.includes("ADMIN");
  }
  
  public isTokenExpired(): boolean {
    const expirationDate = new Date(this.obtainRolOfUser().exp * 1000);
    const currentDate = new Date();
    return expirationDate < currentDate;
}
}
