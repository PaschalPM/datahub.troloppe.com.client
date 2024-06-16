import { Component } from '@angular/core';
import { OverviewComponent } from '../../../components/dashboard/widgets/overview/overview.component';
import { ChartComponent } from '../../../components/dashboard/chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { productSales } from '../../../../fixtures/products';
import { ChartContainerComponent } from '../../../components/chart-container/chart-container.component';
import { UserRoles } from '../../../enums/user-roles';
import { PermissionService } from '../../../services/permission.service';

@Component({
  selector: 'dashboard-street-data-overview',
  standalone: true,
  imports: [
    OverviewComponent,
    ChartComponent,
    ChartContainerComponent,
    NgxChartsModule,
  ],
  templateUrl: './street-data-overview.component.html',
})
export class StreetDataOverviewComponent {
  results = productSales;
  isPermitted!: boolean;
  allowedToView = [UserRoles.Admin, UserRoles.ResearchManager];

  overviewItems: OverviewWidgetItem[] = [
    {
      id: 1,
      totalSum: 30,
      overviewTitle: 'Total Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 2,
      totalSum: 20,
      overviewTitle: 'Total Verified Street Data',
      myMatIcon: 'streetview',
    },
    {
      id: 3,
      totalSum: 5,
      overviewTitle: 'My Street Data Collected',
      myMatIcon: 'streetview',
    },
    {
      id: 4,
      totalSum: 2,
      overviewTitle: 'My Verified Street Data',
      myMatIcon: 'streetview',
    },
  ];

  constructor(public permission: PermissionService) {
    this.isPermitted = this.permission.isPermitted(this.allowedToView);
  }
}
