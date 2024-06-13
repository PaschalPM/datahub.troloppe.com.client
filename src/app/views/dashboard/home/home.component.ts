import { Component } from '@angular/core';
import { User } from '../../../shared/types/user';
import { AuthService } from '../../../shared/services/auth.service';
import { UserRoles } from '../../../shared/enums/user-roles';
import { HomeNoticeComponent } from '../../../shared/components/dashboard/home-notice/home-notice.component';
import { OverviewComponent } from '../../../shared/components/dashboard/widgets/overview/overview.component';

@Component({
  selector: 'dashboard-home',
  standalone: true,
  imports: [HomeNoticeComponent, OverviewComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  
  allowedToView = [UserRoles.Admin, UserRoles.ResearchManager];

  constructor(public auth: AuthService) {}
}
