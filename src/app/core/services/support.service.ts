import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from './reports/config.service';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService) { }

  contact(model: any): Promise<any> {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': '*/*'
    };

    const url = this.configService.getCommunicationServicesUrl('ContactForms');

    return this.http.post(url, model, { headers: headers }).toPromise();
  }
}
