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
                return this.http.get<any>(`${environment.apiUrl}/Category`);
        }

}
