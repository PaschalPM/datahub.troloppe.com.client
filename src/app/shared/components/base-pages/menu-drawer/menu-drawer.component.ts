import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AppEventEmitterService } from '../../../services/app-event-emitter.service';
import { RouterModule } from '@angular/router';
import { SigninOrDashboardLinkComponent } from '../signin-or-dashboard-link/signin-or-dashboard-link.component';

@Component({
  selector: 'menu-drawer',
  standalone: true,
  imports: [CommonModule, RouterModule, SigninOrDashboardLinkComponent],
  templateUrl: './menu-drawer.component.html'
})
export class MenuDrawerComponent {
  @Input() isMenuDrawerOpen = false;

  signInOrDashboard: 'sign-in' | 'dashboard' = 'sign-in';
  liClass =
    'flex font-medium text-light-blue hover:bg-lighter-blue transition-all duration-300';
  aClass = 'inline-block h-full w-full p-2';

  constructor(private appEventEmitter: AppEventEmitterService) {}

  ngOnInit(): void {
    this.appEventEmitter.listen<'sign-in' | 'dashboard'>(
      'signInOrDashboardEvent',
      (event) => {
        this.signInOrDashboard = event;
      },
    );
  }
}
