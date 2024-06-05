import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FacebookIconComponent } from '../../../shared/components/svgs/facebook-icon.component';
import { InstagramIconComponent } from '../../../shared/components/svgs/instagram-icon.component';
import { LinkedinIconComponent } from '../../../shared/components/svgs/linkedin-icon.component';
import { AppEventEmitterService } from '../../../shared/services/app-event-emitter.service';
import { SigninOrDashboardLinkComponent } from '../../../shared/components/base-pages/signin-or-dashboard-link/signin-or-dashboard-link.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FacebookIconComponent,
    InstagramIconComponent,
    LinkedinIconComponent,
    SigninOrDashboardLinkComponent,
  ],
  templateUrl: './home.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class HomeComponent {
  signInOrDashboard: 'sign-in' | 'dashboard' = 'sign-in';

  constructor(private appEventEmitter: AppEventEmitterService) {}

  ngOnInit(): void {
    this.appEventEmitter.listen<'sign-in' | 'dashboard'>(
      'signInOrDashboardEvent',
      (event) => {
        this.signInOrDashboard = event;
      }
    );
  }
}
