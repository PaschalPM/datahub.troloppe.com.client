import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { NewStreetDataFormService } from './new-street-data-form.service';
import { apiUrlFactory } from '../../configs/global';
import { HttpClient } from '@angular/common/http';
import { HttpRequestCacheService } from './http-request-cache.service';
import { FormFieldDataService } from './street-data/form-field-data.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveLocationService {
  private activeLocation$ = new BehaviorSubject<LocationType | null>(null);
  private activeLocationSubscription!: Subscription;

  constructor(
    private httpClient: HttpClient,
    private httpCache: HttpRequestCacheService
  ) {}

  activeLocation() {
    this.activeLocationSubscription =
      this.revalidateActiveLocation().subscribe();
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
          this.httpCache.reset();
        })
      );
  }

  public forGuard() {
    return this.revalidateActiveLocation().pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  ngOnDestroy(): void {
    this.activeLocationSubscription.unsubscribe();
  }
  private revalidateActiveLocation() {
    return this.httpClient
      .get<LocationType>(apiUrlFactory('/locations/get-active-location'))
      .pipe(
        tap({
          next: (activeLocation) => {
            this.activeLocation$.next(activeLocation);
          },
          error: () => {
            this.activeLocation$.next(null);
          },
        })
      );
  }
}
