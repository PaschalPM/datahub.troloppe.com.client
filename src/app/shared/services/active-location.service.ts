import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of, switchMap, tap } from 'rxjs';
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

  public forGuard() {
    return this.httpClient
      .get<NewStreetDataFormType>(apiUrlFactory('/street-data/form-data'))
      .pipe(
        map((value) => value.locations.find((location) => location.is_active)),
        switchMap((value) => (value ? of(true) : of(false)))
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
