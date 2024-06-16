import { Component } from '@angular/core';
import { AuthNoticeComponent } from '../../../shared/components/dashboard/home/auth-notice/auth-notice.component';
import { PaneNavigatorPanelComponent } from '../../../shared/components/pane-navigator-panel/pane-navigator-panel.component';
import { StreetDataOverviewComponent } from '../../../shared/partials/dashboard/street-data-overview/street-data-overview.component';
import { ChartComponent } from '../../../shared/components/dashboard/chart/chart.component';
import { productSales } from '../../../fixtures/products';
import { ChartContainerComponent } from '../../../shared/components/chart-container/chart-container.component';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [
    AuthNoticeComponent,
    PaneNavigatorPanelComponent,
    StreetDataOverviewComponent,
    ChartComponent,
    ChartContainerComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  activePane: 'street-data' | 'investment-data' = 'street-data';

  results = productSales;
  tabs = [
    {
      pane: 'street-data',
      tabLabel: `Street Data`,
    },
    {
      pane: 'investment-data',
      tabLabel: `Investment Data`,
    },
  ];
}
