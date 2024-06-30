import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreetData, StreetDataColType } from '../types/street-data';
import { BASE_API_URL, apiHttpOptions } from '../../configs/global';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {


  constructor(private httpClient: HttpClient) {}

  

  // REMOVE SOON
  getStreetData() {
    return this.httpClient.get<StreetDataColType[]>(
      'http://localhost:3000/street-data'
    );
  }

  getStreetDataDetails(streetDataId: number){
    return this.httpClient.get<StreetData>(
      `http://localhost:3000/street-data/${streetDataId}`
    );
  }
  // store(body: any) {
  //   return this.httpClient.post(
  //     BASE_API_URL + '/street-data',
  //     body,
  //     apiHttpOptions
  //   );
  // }
}
