import { HttpInterceptorFn } from '@angular/common/http';
import { AuthResponse } from '../interface';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const localData = localStorage.getItem('pcrescer_data');
  if (!localData) { return next(req); }

  const { accessToken } = JSON.parse(localData) as AuthResponse

  if (accessToken) {
    const clone = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + accessToken) })

    return next(clone);
  }
  return next(req);
};
