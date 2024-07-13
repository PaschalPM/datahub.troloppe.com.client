import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiHttpOptions, apiUrlFactory } from 'app/configs/global';
import { BehaviorSubject, Subscription, tap } from 'rxjs';

type WidgetSetType = {
  total_street_data: number;
  total_verified_street_data: number;
  user_street_data: number;
  user_verified_street_data: number;
};

type VisualSetType = {
  verified_street_data_by_location: Array<{ name: string; value: number }>;
  verified_street_data_by_sector: Array<{ name: string; value: number }>;
};
@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private widgetSet$ = new BehaviorSubject<WidgetSetType | null>(null);
  private visualSet$ = new BehaviorSubject<VisualSetType | null>(null);
  private userPerformanceVisual$ = new BehaviorSubject<{
    verified_street_data_by_staff: Array<NameAndValueType>;
  } | null>(null);
  private widgetSetSubsciption!: Subscription;
  private visualSetSubsciption!: Subscription;
  private userPerformanceVisualSubscription!: Subscription;

  constructor(private httpClient: HttpClient) {}

  getWidgetSet() {
    this.retrieveWidgetSet().subscribe();
    return this.widgetSet$.asObservable();
  }
  getVisualSet() {
    this.retrieveVisualSet().subscribe();
    return this.visualSet$.asObservable();
  }
  getUserPerformanceVisual() {
    this.retrieveUserPerformanceVisual().subscribe();
    return this.userPerformanceVisual$.asObservable();
  }

  ngOnDestroy(): void {
    this.widgetSetSubsciption.unsubscribe();
    this.visualSetSubsciption.unsubscribe();
    this.userPerformanceVisualSubscription.unsubscribe();
  }
  
  private retrieveWidgetSet() {
    return this.httpClient
      .get<WidgetSetType>(
        apiUrlFactory('/street-data/overview/widget-set'),
        apiHttpOptions
      )
      .pipe(
        tap((value) => {
          this.widgetSet$.next(value);
        })
      );
  }

  private retrieveVisualSet() {
    return this.httpClient
      .get<VisualSetType>(
        apiUrlFactory('/street-data/overview/visual-set'),
        apiHttpOptions
      )
      .pipe(
        tap((value) => {
          this.visualSet$.next(value);
        })
      );
  }

  private retrieveUserPerformanceVisual() {
    return this.httpClient
      .get<{
        verified_street_data_by_staff: Array<NameAndValueType>;
      }>(
        apiUrlFactory('/street-data/overview/user-performance'),
        apiHttpOptions
      )
      .pipe(
        tap((value) => {
          this.userPerformanceVisual$.next(value);
        })
      );
  }
}
