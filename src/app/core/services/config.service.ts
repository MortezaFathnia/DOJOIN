import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  setCacheItem(cacheKey: string, cacheItem: any, serialize: boolean = true) {
    localStorage.setItem(this.getCacheKey(cacheKey), serialize ? JSON.stringify(cacheItem) : cacheItem)
  }

  setSessionStorage(cacheKey: string, cacheItem: any){
    sessionStorage.setItem(cacheKey,cacheItem);
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
