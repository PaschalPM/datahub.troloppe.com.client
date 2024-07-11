import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StreetData, StreetDataColType } from '../types/street-data';
import { apiUrlFactory, apiHttpOptions } from '../../configs/global';
import { BehaviorSubject, Observable, map, switchMap, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionService } from './permission.service';
import { HttpRequestCacheService } from './http-request-cache.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root',
})
export class StreetDataService {
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
    private permission: PermissionService,
    private httpReqCacheService: HttpRequestCacheService,
    private router: Router,
    private loader: LoaderService
  ) {}

  getStreetData() {
    return this.auth.onCurrentUser().pipe(
      switchMap((currentUser) => {
        return this.httpClient
          .get<StreetDataColType[]>(apiUrlFactory('/street-data'))
          .pipe(
            tap((value) => { this.loader.stop()}),
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
    return this.httpClient
      .get<StreetData>(apiUrlFactory(`/street-data/${streetDataId}`))
      .pipe(tap(() => this.loader.stop()));
  }
  store(body: any) {
    return this.httpClient
      .post<{id: number}>(apiUrlFactory(`/street-data`), body, apiHttpOptions)
      .pipe(
        tap(() => {
          this.httpReqCacheService.reset();
          this.loader.stop();
        })
      );
  }

  edit(body: any, streetDataId: number) {
    return this.httpClient
      .put(apiUrlFactory(`/street-data/${streetDataId}`), body, apiHttpOptions)
      .pipe(
        tap(() => {
          this.httpReqCacheService.reset();
          this.loader.stop();
        })
      );
  }

  delete(streetDataId: number) {
    return this.httpClient
      .delete(apiUrlFactory(`/street-data/${streetDataId}`), apiHttpOptions)
      .pipe(
        tap(() => {
          this.httpReqCacheService.reset();
          this.router.navigateByUrl('/dashboard/street-data');
          this.loader.stop();
        })
      );
  }
}
