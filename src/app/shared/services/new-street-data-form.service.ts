import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, merge } from 'rxjs';
import { apiUrlFactory } from '../../configs/global';

export const LOCATIONS_KEY = 'locations';
export const SECTIONS_KEY = 'sections';
export const SECTORS_KEY = 'sectors';
export const SUB_SECTORS_KEY = 'sub_sectors';
export const UNIQUE_CODES_KEY = 'unique-codes';

@Injectable({
  providedIn: 'root',
})
export class NewStreetDataFormService {
  private propertyUniqueCodes$ =
    new BehaviorSubject<NewStreetDataFormEventType<IdAndValueType> | null>(
      null
    );
  private locations$ =
    new BehaviorSubject<NewStreetDataFormEventType<LocationType> | null>(null);
  private sections$ =
    new BehaviorSubject<NewStreetDataFormEventType<SectionType> | null>(null);
  private sectors$ =
    new BehaviorSubject<NewStreetDataFormEventType<IdAndNameType> | null>(null);
  private subSectors$ =
    new BehaviorSubject<NewStreetDataFormEventType<SubSectorType> | null>(null);

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
      this.sectors$.asObservable(),
      this.subSectors$.asObservable(),
      this.propertyUniqueCodes$.asObservable()
    );
  }

  getNewStreetDataFormValues() {
    return this.getNewStreetDataFormValues$;
  }

  ngOnDestroy(): void {
    this.getNewStreetDataFormValuesSubscription.unsubscribe();
  }

  public retrieveOnlyUniqueCodes() {
    this.httpClient
      .get<NewStreetDataFormType>(apiUrlFactory('/street-data/form-data'))
      .subscribe((value) => {
        this.propertyUniqueCodes$.next({
          key: UNIQUE_CODES_KEY,
          value: value.unique_codes,
        });
      });
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
        this.sectors$.next({ key: SECTORS_KEY, value: value.sectors });
        this.subSectors$.next({
          key: SUB_SECTORS_KEY,
          value: value.sub_sectors,
        });
        this.propertyUniqueCodes$.next({
          key: UNIQUE_CODES_KEY,
          value: value.unique_codes,
        });
      });
  }
}
