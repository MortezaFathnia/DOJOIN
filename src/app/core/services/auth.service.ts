import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token-model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { ConfigService } from './reports/config.service';
import { CredentialModel } from '../models/credential.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenModel: TokenModel;
  isAuthenticated = false;
  private hasNewToken = false;
  rememberMe = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private configService: ConfigService
  ) { }

  login(username: string, password: string) {
    const url = this.configService.getIdentityServicesUrl('account/signin');
    const credentials = new CredentialModel(username, password);
    this.configService.setCacheItem('credentials', credentials);

    return this.http.post<any>(url, credentials);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  updateToken(data) {
    this.tokenModel = new TokenModel(data.Token, data.TokenExpiryDate);
    this.configService.setCacheItem('TokenModel', this.tokenModel);
  }

  getAccessToken() {

    const refreshToken = this.configService.getCacheItem('TokenModel');

    if (refreshToken) {
      this.tokenModel = new TokenModel(refreshToken.token, refreshToken.expiryDate);
    }

    if (!this.tokenModel.isValid()) {
      if (!this.rememberMe) {
        this.router.navigate(['login']);
        return;
      } else {
        return this.refreshToken();
      }
    }

    if (refreshToken != null) {
      return of(refreshToken);
    } else {

      // return this.token['token'];
      return this.refreshToken();
    }
  }

  refreshToken() {
    // if (this.hasNewToken) {
    //   return of(this.tokenModel.token);
    // }

    // append refresh token if you have one
    const url = this.configService.getIdentityServicesUrl('account/signin');

    const credential = this.configService.getCacheItem('credentials');

    if (!credential) {
      this.logout();
    }

    const credentials = new CredentialModel(credential.username, credential.password);
    return this.http.post<any>(url, credentials)
      .pipe(
        // share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map((data) => {
          this.updateToken(data);
          console.log('refresh token ');
          this.hasNewToken = true;

          return this.tokenModel;
          // });)).subscribe(
          // (data) => {
          //   this.updateToken(data);
          //   console.log("refresh token ");
          //   this.hasNewToken = true;

          //   return this.tokenModel;
          // })
        }));
    //.toPromise();
  }
}
