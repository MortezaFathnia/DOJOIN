import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { TokenModel } from '../models/token-model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  inflightAuthRequest = null;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!this.inflightAuthRequest) {
      // this.inflightAuthR equest = this.authService.getAccessToken();
    }

    return this.inflightAuthRequest.pipe(

      switchMap((newToken: TokenModel) => {
        // unset inflight request
        this.inflightAuthRequest = null;
        // clone the original request

        const authReqRepeat = request.clone({
          headers: request.headers.set(
            'Authorization', `Bearer ${newToken ? newToken.token : ''}`)
        });

        // resend the request
        return next.handle(authReqRepeat);
      }),
      catchError((error) => {
        // checks if a url is to an admin api or not
        if (error.status === 401) {
          this.inflightAuthRequest = this.authService.refreshToken();
          return this.inflightAuthRequest.pipe(
            switchMap((newToken: TokenModel) => {
              // unset inflight request
              this.inflightAuthRequest = null;
              // clone the original request

              const authReqRepeat = request.clone({
                headers: request.headers.set(
                  'Authorization', `Bearer ${newToken ? newToken.token : ''}`)
              });

              // resend the request
              return next.handle(authReqRepeat);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );

  }
}
