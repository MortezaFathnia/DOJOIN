import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService) { }

  changeIsTraining(orderId: number, isTraining: boolean): Observable<any> {
    const model = {
      OrderId: orderId,
      IsTraining: isTraining
    };
    const url = this.configService.getPOSServicesUrl(`Orders/${orderId}`);
    return this.http.patch<any>(url, model);
  }

  changeClockInOutTime(restaurantId: number, clockId: number, clockInTime: string = null, clockOutTime: string = null): Observable<any> {
    const model = {
      ClockId: clockId,
      ClockInTime: null,
      ClockOutTime: null
    };

    if (clockInTime != null) {
      model.ClockInTime = clockInTime;
    }

    if (clockOutTime != null) {
      model.ClockOutTime = clockOutTime;
    }

    const url = this.configService.getPOSServicesUrl(`/Restaurants/${restaurantId}/Clocks/${clockId}`);

    return this.http.patch<any>(url, model);
  }
}
