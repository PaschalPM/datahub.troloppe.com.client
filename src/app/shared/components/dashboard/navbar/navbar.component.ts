import { Component, Input } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';
import { MenuTogglerComponent } from '../menu-toggler/menu-toggler.component';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'app/shared/types/user';
import { CapitalizePipe } from '@pipes/capitalize.pipe';

@Component({
  selector: 'dashboard-navbar',
  standalone: true,
  imports: [
    MenuTogglerComponent,
    ProfileDropdownComponent,
    MyMatIconComponent,
    NgIf,
    RouterModule,
    AsyncPipe,
    TitleCasePipe
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
  currentUser$!: Observable<User | null>;

  constructor(
    public ns: NotificationsService,
    public authService: AuthService
  ) {
    this.currentUser$ = this.authService.onCurrentUser();
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }
}
