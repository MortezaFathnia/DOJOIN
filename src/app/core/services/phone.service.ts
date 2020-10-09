import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { __rest } from 'tslib';

@Injectable({
        providedIn: 'root'
})
export class PhoneService {

        constructor(
                private http: HttpClient
        ) { }
        getCountryCode(): Observable<any> {
                return this.http.get<any>('http://208.109.13.111:9191/api/Country').pipe(map(data => data.result));
        }

}
