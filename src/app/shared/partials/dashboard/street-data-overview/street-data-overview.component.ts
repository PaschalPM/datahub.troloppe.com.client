import { Component } from '@angular/core';
import { OverviewComponent } from '../../../components/dashboard/widgets/overview/overview.component';
import { ChartComponent } from '../../../components/dashboard/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartContainerComponent } from '../../../components/chart-container/chart-container.component';
import { UserRoles } from '../../../enums/user-roles';
import { PermissionService } from '../../../services/permission.service';
import { ActiveLocationIndicatorComponent } from '../../../components/dashboard/active-location-indicator/active-location-indicator.component';
import { Router } from '@angular/router';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { OverviewService } from '@services/street-data/overview.service';
import { SpinnerComponent } from '@components/spinner/spinner.component';

@Component({
  selector: 'dashboard-street-data-overview',
  standalone: true,
  imports: [
    OverviewComponent,
    ChartComponent,
    ChartContainerComponent,
    NgxChartsModule,
    ActiveLocationIndicatorComponent,
    TextButtonComponent,
    SpinnerComponent,
  ],
  templateUrl: './street-data-overview.component.html',
})
export class StreetDataOverviewComponent {
  verifiedStreetDataByLocation!: Array<NameAndValueType>;
  verifiedStreetDataBySector!: Array<NameAndValueType>;
  isLoadingVisualSet = true;

  verifiedStreetDataUploadedByStaff!: Array<NameAndValueType>;
  isLoadingUserPerformance = true;

  isPermitted!: boolean;
  allowedToView = [UserRoles.Admin, UserRoles.ResearchManager];

  overviewItems: OverviewWidgetItem[] = [
    {
      id: 1,
      totalSum: 0,
      overviewTitle: 'Total Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 2,
      totalSum: 0,
      overviewTitle: 'Total Verified Street Data',
      myMatIcon: 'streetview',
    },
    {
      id: 3,
      totalSum: 0,
      overviewTitle: 'My Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 4,
      totalSum: 0,
      overviewTitle: 'My Verified Street Data',
      myMatIcon: 'streetview',
    },
  ];

  constructor(
    private permission: PermissionService,
    private router: Router,
    private streetDataOverviewService: OverviewService
  ) {
    this.isPermitted = this.permission.isPermitted(this.allowedToView);
  }

  ngOnInit(): void {
    this.getWidgetOverviewData();
    this.getVisualOverviewData();
    this.getUserPerformanceVisuals();
  }
  routeToNewStreetView() {
    this.router.navigateByUrl('/dashboard/street-data/new');
  }

  getWidgetOverviewData() {
    this.streetDataOverviewService.getWidgetSet().subscribe((value) => {
      if (value) {
        this.overviewItems[0].totalSum = value.total_street_data;
        this.overviewItems[1].totalSum = value.total_verified_street_data;
        this.overviewItems[2].totalSum = value.user_street_data;
        this.overviewItems[3].totalSum = value.user_verified_street_data;
      }
    });
  }

  getVisualOverviewData() {
    this.streetDataOverviewService.getVisualSet().subscribe((value) => {
      if (value) {
        this.verifiedStreetDataByLocation =
          value!.verified_street_data_by_location;
        this.verifiedStreetDataBySector = value.verified_street_data_by_sector;
        this.isLoadingVisualSet = false;
      }
    });
  }
  getUserPerformanceVisuals() {
    this.streetDataOverviewService
      .getUserPerformanceVisual()
      .subscribe((value) => {
        if (value) {
          this.verifiedStreetDataUploadedByStaff =
            value.verified_street_data_by_staff;
          this.isLoadingUserPerformance = false;
        }
      });
  }
}
