import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ColorSchemeService } from '@services/color-scheme.service';
import { ModalService } from '@services/modal.service';
import { CapitalizePipe } from '@pipes/capitalize.pipe';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { ProfileModalComponent } from '@partials/modals/profile-modal/profile-modal.component';
import { ColorSchemeModalComponent } from '@partials/modals/color-scheme-modal/color-scheme-modal.component';
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@services/loader.service';
import { Subscription } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { MyMatIconComponent } from "../../common/my-mat-icon.component";
import { UtilsService } from '@services/utils.service';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'dashboard-profile-dropdown',
  standalone: true,
  imports: [CapitalizePipe, ClickOutsideDirective, AsyncPipe, TitleCasePipe, MyMatIconComponent, TextButtonComponent],
  templateUrl: './profile-dropdown.component.html',
  styles: `
    :host{
      display:contents;
    }
  `,
  animations: [
    trigger('dropdownTrigger', [
      transition(':enter', [
        style({opacity: 0}),
        animate('200ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('2000ms', style({opacity: 0}))
      ]),
    ])
  ]
})
export class ProfileDropdownComponent {
  @Output() isProfileDropdownOpenChange = new EventEmitter();
  @ViewChild('profileDropdown') profileDropdownElement!: ElementRef;

  name = ''
  firstRole = ''
  currentUserSubscription!: Subscription;
  
  constructor(
    private modalService: ModalService,
    public colorScheme: ColorSchemeService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private loader: LoaderService,
    public utils: UtilsService
  ) {
   
  }

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.onCurrentUser().subscribe((currentUser) => {
      this.name = currentUser?.name as string
      this.firstRole = currentUser?.roles[0] as string
    })
  }
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
    this.loader.start()
    this.authService.signOut().subscribe(() => {
      this.toastr.success('Successfully logged out.', 'Success')
      this.loader.stop()
      this.router.navigateByUrl('/')
    });
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe()
  }
}
