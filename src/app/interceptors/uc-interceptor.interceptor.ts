import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UcInterceptorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Add your custom logic here
    const modifiedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer YourAccessTokenHere',
      },
    });

    return next.handle(modifiedRequest);
  }
}
