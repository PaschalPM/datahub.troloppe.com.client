import { Component, Input } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { MenuTogglerComponent } from '../menu-toggler/menu-toggler.component';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-navbar',
  standalone: true,
  imports: [
    MenuTogglerComponent,
    ProfileDropdownComponent,
    MyMatIconComponent,
    NgIf,
    RouterModule,
    AsyncPipe
  ],
  templateUrl: './navbar.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class NavbarComponent {
  @Input({ required: true }) title = 'Home';
  isProfileDropdownOpen = false;
  unreadNotificationsCount = 0

  constructor(public ns: NotificationsService) {
    ns.observe().subscribe((value) => {
      this.unreadNotificationsCount = value?.filter((value) => !value.isRead).length ?? 0
    })
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }
}
