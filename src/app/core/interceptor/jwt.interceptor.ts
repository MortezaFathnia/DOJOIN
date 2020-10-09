import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../services/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ConfigService } from '../services/reports/config.service';
import { TokenModel } from '../models/token-model';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  inflightAuthRequest = null;

  constructor(private authService: AuthService, private router: Router, private configService: ConfigService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url === this.configService.getIdentityServicesUrl('account/signin') || request.url === this.configService.getCommunicationServicesUrl('ContactForms')) {
      return next.handle(request);
    }

    if (!this.inflightAuthRequest) {
      this.inflightAuthRequest = this.authService.getAccessToken();
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

          if (!this.inflightAuthRequest) {
            if (!this.authService.rememberMe) {
              this.inflightAuthRequest = null;
              this.router.navigate(['login']);
            } else {
              this.inflightAuthRequest = this.authService.refreshToken();
            }
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
            })
          );
        } else {
          return throwError(error);
        }
      })
    );

  }
}
