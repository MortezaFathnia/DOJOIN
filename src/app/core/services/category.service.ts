import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
        providedIn: 'root'
})
export class CategoryService {

        constructor(
                private http: HttpClient
        ) { }
        getCategories(): Observable<any> {
                return this.http.get<any>('http://208.109.13.111:9090/api/Category');
        }

}
