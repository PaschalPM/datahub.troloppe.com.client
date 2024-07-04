import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, merge } from 'rxjs';
import { apiUrlFactory } from '../../configs/global';

export const LOCATIONS_KEY = 'locations';
export const SECTIONS_KEY = 'sections';
export const UNIQUE_CODES_KEY = 'unique-codes';

@Injectable({
  providedIn: 'root',
})
export class NewStreetDataFormService {
  private locations$ =
    new BehaviorSubject<NewStreetDataFormEventType<LocationType> | null>(null);
  private sections$ =
    new BehaviorSubject<NewStreetDataFormEventType<SectionType> | null>(null);
  private propertyUniqueCodes$ =
    new BehaviorSubject<NewStreetDataFormEventType<IdAndValueType> | null>(
      null
    );
  private getNewStreetDataFormValues$!: Observable<NewStreetDataFormType>;
  private getNewStreetDataFormValuesSubscription!: Subscription;

  constructor(private httpClient: HttpClient) {}

  onInit() {
    this.retrieveAllData();
  }

  // -----> Public Observable Functions

  locations() {
    return this.locations$.asObservable();
  }

  observeAllResources() {
    return merge(
      this.locations$.asObservable(),
      this.sections$.asObservable(),
      this.propertyUniqueCodes$.asObservable()
    );
  }

  getNewStreetDataFormValues() {
    return this.getNewStreetDataFormValues$;
  }

  ngOnDestroy(): void {
    this.getNewStreetDataFormValuesSubscription.unsubscribe();
  }

  private retrieveAllData() {
    this.getNewStreetDataFormValues$ =
      this.httpClient.get<NewStreetDataFormType>(
        apiUrlFactory('/street-data/form-data')
      );

    this.getNewStreetDataFormValuesSubscription =
      this.getNewStreetDataFormValues$.subscribe((value) => {
        this.locations$.next({ key: LOCATIONS_KEY, value: value.locations });
        this.sections$.next({ key: SECTIONS_KEY, value: value.sections });
        this.propertyUniqueCodes$.next({
          key: UNIQUE_CODES_KEY,
          value: value.unique_codes,
        });
      });
  }
}
