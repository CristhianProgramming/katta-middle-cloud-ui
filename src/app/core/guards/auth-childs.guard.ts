import { CanActivateChildFn, Router } from '@angular/router';
import { JwtServiceService } from '../../services/jwt-service.service';
import { inject } from '@angular/core';

export const authChildsGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const jwt = inject(JwtServiceService);

  const token : String | null = localStorage.getItem('token');
  if (!token) {
     router.navigate(["login"]);
    return false;
  }

  if(!jwt.isTokenExpired() ){

    if (jwt.isAdmin()) {
      return true;
    }

    router.navigate(["/"]);
    return false;
  }

 

  localStorage.removeItem('token')
  router.navigate(["login"]);
  return false;

};
