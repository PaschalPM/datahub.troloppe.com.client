import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreetDataColType } from '../types/street-data';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {
  constructor(private httpClient: HttpClient) {}

  getStreetData() {
    return this.httpClient.get<StreetDataColType[]>('http://localhost:3000/street-data')
  }
}
