import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewStreetDataFormService {
  constructor(private httpClient: HttpClient) {}

  getNewStreetDataFormValues() {
    return this.httpClient.get<NewStreetDataFormType>(
      'http://localhost:3000/new-street-data-form'
    );
  }
}
