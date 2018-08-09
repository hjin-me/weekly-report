import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
  constructor(private session: SessionService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authReq = req;
    if (this.session.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `bearer ${this.session.token}`
        },
        body: req.body
      });
    }
    return next.handle(authReq);
  }
}
