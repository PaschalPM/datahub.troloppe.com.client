import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export const PERMISSION_DENIED = 1;
export const POSITION_UNAVAILABLE = 2;

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor() {}

  private errorEvents = new Subject();
  errorEvents$ = this.errorEvents.asObservable();

  observe() {
    if ('geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        () => {},
        (error: GeolocationPositionError) => {
          if (error.code === error.PERMISSION_DENIED) {
            this.errorEvents.next(PERMISSION_DENIED);
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            this.errorEvents.next(POSITION_UNAVAILABLE);
          }
        }
      );
    }
  }

  displayPopupIfAble() {
    if ('geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition(
        () => {},
        () => {}
      );
    }
  }
  
  async getGoogleMapsUrl() {
    return new Promise((res, rej) => {
      if ('geolocation' in window.navigator) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            res(this._getGoogleMapsUrl(position));
          },
          (error) => {
            rej(error.message);
          }
        );
      }
    });
  }

  private _getGoogleMapsUrl(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    return googleMapsUrl;
  }
}
