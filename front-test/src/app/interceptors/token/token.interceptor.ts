import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(request.headers.has('Authorization') && request.headers.get('Authorization')?.includes('token') ){

      let token = sessionStorage.getItem('token');

      let edit_request = request.clone({
        headers : request.headers.set('Authorization' , `Bearer ${token}`)
      });

      return next.handle(edit_request);

    }

    return next.handle(request);
  }
}
