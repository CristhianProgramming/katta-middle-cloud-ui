import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
 const modReq = req.clone({url:'http://localhost:8080/api/v1'+req.url})
  return next(modReq);
};
