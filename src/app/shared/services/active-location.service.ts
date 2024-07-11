import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, of, switchMap, tap } from 'rxjs';
import { NewStreetDataFormService } from './new-street-data-form.service';
import { apiUrlFactory } from '../../configs/global';
import { HttpClient } from '@angular/common/http';
import { HttpRequestCacheService } from './http-request-cache.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveLocationService {
  private activeLocation$ = new BehaviorSubject<LocationType | null>(null);

  constructor(
    private nsdfs: NewStreetDataFormService,
    private httpClient: HttpClient,
    private httpCache: HttpRequestCacheService
  ) {
    this.retrieveActiveLocation();
  }

  activeLocation() {
    return this.activeLocation$.asObservable();
  }

  setActiveLocation(data: { locationIdToActivate?: number }) {
    return this.httpClient
      .put<{ active_location: LocationType }>(
        apiUrlFactory('/locations/activate'),
        data
      )
      .pipe(
        tap((value) => {
          let activeLocation = null;
          if (value && 'active_location' in value) {
            activeLocation = value.active_location;
          }
          this.activeLocation$.next(activeLocation);
          this.httpCache.reset()

        })
      );
  }

  public forGuard() {
    return this.httpClient
      .get<{ name: string }>(
        apiUrlFactory('/locations/check-activate-location')
      )
      .pipe(
        tap((value) => console.log(value)),
        switchMap(() => {
          return of(true);
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  private retrieveActiveLocation() {
    this.nsdfs
      .locations()
      .pipe(map((value) => value?.value.find((location) => location.is_active)))
      .subscribe((value) => {
        this.activeLocation$.next(value as LocationType);
      });
  }
}
