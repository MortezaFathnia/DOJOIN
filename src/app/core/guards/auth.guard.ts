import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { TokenModel } from '../models/token-model';
import { AuthService } from '../services/auth.service';
import { ConfigService } from '../services/reports/config.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private configService: ConfigService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url === '/login') {
      if (this.authService.isAuthenticated) {
        this.router.navigate(['/dashboard']);
        return false;
      } else {
        return true;
      }
    } else {
      if (!this.authService.isAuthenticated) {
        const model = this.configService.getCacheItem('TokenModel');

        if (model) {
          this.authService.tokenModel = new TokenModel(model.token, model.expiryDate);
        }

        if (this.authService.tokenModel && this.authService.tokenModel.isValid()) {
          this.authService.isAuthenticated = true;
        } else {
          if (!this.authService.rememberMe) {
            this.router.navigate(['login']);
            return;
          } else {
            this.authService.refreshToken();
          }
        }
      } else if (!this.authService.tokenModel.isValid()) {
        if (!this.authService.rememberMe) {
          this.router.navigate(['login']);
          return;
        } else {
          this.authService.refreshToken();
        }
      }
    }

    return true;
  }
}
