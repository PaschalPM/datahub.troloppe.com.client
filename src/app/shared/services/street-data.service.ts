import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreetDataColType } from '../types/street-data';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {
  activeLocation!: string;

  constructor(private httpClient: HttpClient) {}

  setActiveLocation(data: { locationIdToActivate?: number }) {
    this.httpClient
      .put<{ location: string; activated: boolean }>(
        `${BASE_API_URL}/set-active-location`,
        data
      )
      .subscribe({
        next: (value) => {
          if (value.activated) {
            this.activeLocation = value.location;
          }
        },
      });
  }
  getStreetData() {
    return this.httpClient.get<StreetDataColType[]>(
      'http://localhost:3000/street-data'
    );
  }
  getNewStreetDataFormValues() {
    return this.httpClient.get<NewStreetDataFormType>(
      'http://localhost:3000/new-street-data-form'
    );
  }

  store(body: any) {
    return this.httpClient.post(
      BASE_API_URL + '/street-data',
      body,
      apiHttpOptions
    );
  }
}
