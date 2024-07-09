import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHttpOptions, apiUrlFactory } from 'app/configs/global';

type WidgetSetType = {
  totalStreetData: number;
  totalVerifiedStreetData: number;
  userStreetData: number;
  userVerifiedStreetData: number;
};

type VisualSetType = {
  verifiedStreetDataByLocation: Array<{name:string, value: number}>,
  verifiedStreetDataBySector: Array<{name:string, value: number}>,
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
    return this.httpClient.get<{verifiedStreetDataByStaff:Array<NameAndValueType>}>(
      apiUrlFactory('/street-data/overview/user-performance'),
      apiHttpOptions
    );
  }
}
