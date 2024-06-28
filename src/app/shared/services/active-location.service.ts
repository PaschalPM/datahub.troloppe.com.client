import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { NewStreetDataFormService } from './new-street-data-form.service';
import { apiUrlFactory } from '../../configs/global';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActiveLocationService {
  private activeLocation$ = new BehaviorSubject<LocationType | null>(null);

  constructor(
    private nsdfs: NewStreetDataFormService,
    private httpClient: HttpClient
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
