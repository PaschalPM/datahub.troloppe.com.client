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
import { apiUrlFactory } from '../../configs/global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActiveLocationService {
  private activeLocation$ = new BehaviorSubject<LocationType | null>(null);
  private activeLocationSubscription!: Subscription;

  constructor(
    private httpClient: HttpClient,
  ) {}

  getActiveLocation(revalidate = true) {
    if (revalidate) {
      this.activeLocationSubscription =
        this.retrieveActiveLocation().subscribe();
    }
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
        })
      );
  }

  forGuard() {
    return this.retrieveActiveLocation().pipe(
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

  private retrieveActiveLocation() {
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
