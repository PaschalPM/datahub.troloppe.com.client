import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreetData, StreetDataColType } from '../types/street-data';
import { apiUrlFactory, apiHttpOptions } from '../../configs/global';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private permission: PermissionService
  ) {}

  // REMOVE SOON
  getStreetData() {
    return this.auth.currentUser().pipe(
      switchMap((currentUser) => {
        return this.httpClient
          .get<StreetDataColType[]>(apiUrlFactory('/street-data'))
          .pipe(
            map((streetDataList) =>
              this.permission.isResearchStaff
                ? streetDataList.filter(
                    (streetData) =>
                      streetData.creator.toLowerCase() ===
                      currentUser?.name.toLowerCase()
                  )
                : streetDataList
            )
          );
      })
    );
  }

  getStreetDataDetails(streetDataId: number) {
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
