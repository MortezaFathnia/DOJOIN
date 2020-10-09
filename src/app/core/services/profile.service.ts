import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConfigService } from './reports/config.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  changePassword(model: any): Observable<any> {
    const url = this.configService.getIdentityServicesUrl(
      `Users/${model.xRefCode}`
    );
    return this.http.patch<any>(url, model);
  }
}
