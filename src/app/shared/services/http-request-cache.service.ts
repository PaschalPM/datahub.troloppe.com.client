import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestCacheService {
  private cache: Record<
    string,
    { httpResponse: HttpResponse<any>; exp: Date }
  > = {};
  private expMinutes = 5;

  constructor() {}

  config({ expMinutes }: { expMinutes: number }) {
    this.expMinutes = expMinutes;
  }

  reset() {
    this.expMinutes = 5;
  }

  get(key: string) {
    const cachedData = this.cache[key];
    if (cachedData) {
      if (this.isFresh(cachedData.exp)) {
        return cachedData.httpResponse;
      }
      this.pop(key);
      return null;
    }
    return null;
  }

  put(key: string, httpResponse: HttpResponse<any>) {
    this.cache[key] = {
      httpResponse,
      exp: this.getCacheExpirationTime(),
    };
  }

  private getCacheExpirationTime() {
    const currentDate = new Date();
    const milliseconds = this.expMinutes * 60 * 1000;
    return new Date(currentDate.getTime() + milliseconds);
  }

  private isFresh(expTime: Date) {
    const currentDate = new Date();
    return expTime > currentDate;
  }

  private pop(key: string) {
    const httpResponse = this.cache[key].httpResponse;
    delete this.cache[key];
    return httpResponse;
  }
}
