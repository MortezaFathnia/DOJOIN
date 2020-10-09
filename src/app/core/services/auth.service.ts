import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TokenModel } from '../models/auth/token-model';
import { UserModel } from '../models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  login(countryId: string, username: string, password: string) {
    return this.http.post<any>('http://208.109.13.111:9191/api/Account/Login', { countryId, username, password, expiresInMinute: 60 });
  }
  refreshToken(): Observable<any> {
    const current_token = localStorage.getItem('token') ? localStorage.getItem('token') : sessionStorage.getItem('token');
    const refresh_token = localStorage.getItem('refreshToken') ? localStorage.getItem('refreshToken') : sessionStorage.getItem('refreshToken');
    return this.http.post<any>('http://208.109.13.111:9191/api/Account/RenewToken', { current_token, refresh_token });
  }

}
