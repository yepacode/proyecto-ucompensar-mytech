import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');

  console.log('[Interceptor]', req.method, req.url, 'Token:', token ? 'SI (' + token.substring(0, 10) + '...)' : 'NO HAY TOKEN');

  const headers: Record<string, string> = {
    'Accept': 'application/json'
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const clonedReq = req.clone({ setHeaders: headers });
  return next(clonedReq);
};
