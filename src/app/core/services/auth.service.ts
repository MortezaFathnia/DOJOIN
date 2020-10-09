import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenModel } from '../models/auth/token-model';
import { UserModel } from '../models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenModel: TokenModel;
  isAuthenticated = false;
  private hasNewToken = false;
  rememberMe = false;
  user: UserModel;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  login(countryId:string,username: string, password: string) {
    return this.http.post<any>('http://208.109.13.111:9191/api/Account/Login', {countryId,username,password,expiresInMinute:60});
  }

}
