import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrlFactory } from 'app/configs/global';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FormFieldDataService {
  private formFieldData$ =
    new BehaviorSubject<StreetDataFormFieldDataInterface | null>(null);

  private formFieldDataSubscription!: Subscription;

  constructor(private httpClient: HttpClient) {}

  formFieldData() {
    this.formFieldDataSubscription = this.revalidateFormFieldData().subscribe();
    return this.formFieldData$.asObservable();
  }

  private revalidateFormFieldData() {
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

  ngOnDestroy(): void {
    this.formFieldDataSubscription.unsubscribe();
  }
}
