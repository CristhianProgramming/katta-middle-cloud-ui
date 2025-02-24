import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateFn, Router } from '@angular/router';
import { JwtServiceService } from '../../services/jwt-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwt = inject(JwtServiceService);

  const token : String | null = localStorage.getItem('token');

  if (!token) {
     router.navigate(["login"]);
    return false;
  }

  if(!jwt.isTokenExpired()){
    return true;
  }

  localStorage.removeItem('token')
  router.navigate(["login"]);
  return false;

};
