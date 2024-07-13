import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from 'app/configs/global';
import { BehaviorSubject, map, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormFieldDataService {
  private formFieldData$ =
    new BehaviorSubject<StreetDataFormFieldDataInterface | null>(null);

  private formFieldDataSubscription!: Subscription;

  constructor(private httpClient: HttpClient) {}

  getFormFieldData(revalidate = true) {
    if (revalidate) {
      this.formFieldDataSubscription = this.retrieveFormFieldData().subscribe();
    }
    return this.formFieldData$.asObservable();
  }

  ngOnDestroy(): void {
    this.formFieldDataSubscription.unsubscribe();
  }

  private retrieveFormFieldData() {
    return this.httpClient
      .get<StreetDataFormFieldDataInterface>(
        apiUrlFactory('/street-data/form-field-data')
      )
      .pipe(
        tap((formFieldData) => {
          this.formFieldData$.next(formFieldData);
        })
      );
  }
}
