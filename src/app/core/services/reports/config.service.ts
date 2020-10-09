import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  set clientNameSpace(value: string) {
    this._clientNameSpace = value;
  }

  private _clientNameSpace: string;

  getCommunicationServicesUrl(urlSection: string) {
    return `${environment.communicationServicesUrl}/${urlSection}`;
  }
  getIdentityServicesUrl(urlSection: string) {
    return `${environment.identityServicesUrl}/${urlSection}`;
  }

  getReportingServicesUrl(urlSection: string) {
    return `${environment.reportingServicesUrl}/${urlSection}`;
  }

  getPOSServicesUrl(urlSection: string) {
    if (!this._clientNameSpace) {
      this.clientNameSpace = this.getCacheItem('Company').clientNameSpace;
    }

    return `${environment.posCompanyServicesUrl}/${this._clientNameSpace}/${urlSection}`;
  }

  getOnlineOrderingServiceUrl(urlSection: string): string {
    return `${environment.onlineOrderingService}/${urlSection}`;
  }

  setCacheItem(cacheKey: string, cacheItem: any, serialize: boolean = true) {
    localStorage.setItem(this.getCacheKey(cacheKey), serialize ? JSON.stringify(cacheItem) : cacheItem)
  }

  clearAllCacheItems() {
    localStorage.clear();
  }

  getCacheItem(cacheKey: string) {
    return JSON.parse(localStorage.getItem(this.getCacheKey(cacheKey)));
  }

  private getCacheKey(cacheName: string) {
    return `MyMealsyPortal_${cacheName}`;
  }
}
