import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHttpOptions, apiUrlFactory } from 'app/configs/global';

type WidgetSetType = {
  total_street_data: number;
  total_verified_street_data: number;
  user_street_data: number;
  user_verified_street_data: number;
};

type VisualSetType = {
  verified_street_data_by_location: Array<{name:string, value: number}>,
  verified_street_data_by_sector: Array<{name:string, value: number}>,
}
@Injectable({
  providedIn: 'root',
})
export class StreetDataOverviewService {
  constructor(private httpClient: HttpClient) {}

  getWidgetSet() {
    return this.httpClient.get<WidgetSetType>(
      apiUrlFactory('/street-data/overview/widget-set'),
      apiHttpOptions
    );
  }

  getVisualSet(){
    return this.httpClient.get<VisualSetType>(
      apiUrlFactory('/street-data/overview/visual-set'),
      apiHttpOptions
    );
  }
  
  getUserPerformanceVisual(){
    return this.httpClient.get<{verified_street_data_by_staff:Array<NameAndValueType>}>(
      apiUrlFactory('/street-data/overview/user-performance'),
      apiHttpOptions
    );
  }
}
