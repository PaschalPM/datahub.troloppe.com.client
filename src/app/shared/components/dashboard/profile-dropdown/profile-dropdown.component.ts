import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { ModalService } from '../../../services/modal.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { ClickOutsideDirective } from '../../../directives/click-outside.directive';
import { ProfileModalComponent } from '../../../partials/profile-modal/profile-modal.component';
import { ColorSchemeModalComponent } from '../../../partials/color-scheme-modal/color-scheme-modal.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'dashboard-profile-dropdown',
  standalone: true,
  imports: [CapitalizePipe, ClickOutsideDirective],
  templateUrl: './profile-dropdown.component.html',
})
export class ProfileDropdownComponent {
  @Input({ required: true }) name!: string;
  @Output() isProfileDropdownOpenChange = new EventEmitter();
  @ViewChild('profileDropdown') profileDropdownElement!: ElementRef;

  constructor(
    private modalService: ModalService,
    public colorScheme: ColorSchemeService,
    private authService: AuthService
  ) {}

  openProfileModal() {
    const template = ProfileModalComponent;
    this.modalService.open(template);
    this.closeProfileDropdown();
  }

  openColorSchemeModal() {
    const template = ColorSchemeModalComponent;
    this.modalService.open(template);
    this.closeProfileDropdown();
  }

  closeProfileDropdown() {
    this.isProfileDropdownOpenChange.emit(false);
  }

  signOut() {
    this.authService.signOut().subscribe(() => {
      alert('Logged out');
    });
  }
}
