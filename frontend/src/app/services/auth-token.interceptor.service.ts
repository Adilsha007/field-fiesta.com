import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    console.log('entering interceptor');
    
    const user = this.authService.getUserFromLocalStorage();
    
    if (user.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    // if (request.url.includes('/logout')) {
    //   request = request.clone({
    //     setHeaders: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${user.token}`
    //     },
    //     body: {} 
    //   });
    // }

    return next.handle(request);
  
  }
}
