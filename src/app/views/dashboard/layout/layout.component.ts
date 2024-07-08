import { Component, HostBinding } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UtilsService } from '@services/utils.service';
import { SideMenuComponent } from '@components/dashboard/side-menu/side-menu.component';
import { NavbarComponent } from '@components/dashboard/navbar/navbar.component';
import { MediaQueryService } from '@services/media-query.service';
import { Title } from '@angular/platform-browser';
import { AppEventEmitterService } from '@services/app-event-emitter.service';
import { ColorSchemeService } from '@services/color-scheme.service';
import { TOGGLE_SIDE_MENU } from '../../../shared/constants/event-keys';
import { EXTRA_LARGE } from '../../../shared/constants/media-query';
import { ModalComponent } from '@components/modal/modal.component';
import { NotificationsService } from '@services/notifications.service';
import { WindowFocusService } from '@services/window-focus.service';
import { Subscription } from 'rxjs';
import { NewStreetDataFormService } from '@services/new-street-data-form.service';
import { ImageViewerModalComponent } from '@components/image-viewer-modal/image-viewer-modal.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, ModalComponent, ImageViewerModalComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  @HostBinding('class.dashboard-menu-open')
  isMenuOpened = false;
  title = 'Home';
  isProfileDropdownOpen = false;
  isExtraLarge = false;
  windowFocusSubscription!: Subscription;
  fetchNotificationsSubscription!: Subscription;


  constructor(
    private mediaQuery: MediaQueryService,
    private router: Router,
    private pageTitle: Title,
    private appEventEmitter: AppEventEmitterService,
    private colorScheme: ColorSchemeService,
    private ns: NotificationsService,
    private wfs: WindowFocusService,
    private nsdfs: NewStreetDataFormService,
    public utils: UtilsService
  ) {
    this.appEventEmitter.listen(TOGGLE_SIDE_MENU, (state: boolean) => {
      this.isMenuOpened = state;
    });
  }

  ngOnInit(): void {
    // Responsive Layout Observer
    this.responsiveLayoutObserver();

    //  Sets the dashboard Title
    this.setDasboardTitle();

    // Sets the color scheme of the dashboard
    this.colorScheme.init();

    // Fetches User Notifications
    this.fetchNotificationsSubscription = this.ns.fetchNotifications().subscribe();

    // Revalidate ColorScheme and Notifications on Window Focus
    this.revalidateOnWindowFocus();

    // Initializes all street data needed for street data form
    this.nsdfs.onInit();
  }

  ngOnDestroy(): void {
    this.windowFocusSubscription.unsubscribe();
    this.fetchNotificationsSubscription.unsubscribe();
  }

  private responsiveLayoutObserver() {
    this.mediaQuery.observe(EXTRA_LARGE).subscribe({
      next: (matches) => {
        this.isExtraLarge = matches;
        this.isMenuOpened = matches;
        this.appEventEmitter.emit(TOGGLE_SIDE_MENU, this.isMenuOpened);
      },
    });
  }

  private setDasboardTitle() {
    this.title = this.pageTitle.getTitle();
    this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          setTimeout(() => {
            if(!this.isExtraLarge){
              this.appEventEmitter.emit(TOGGLE_SIDE_MENU, false);
            }
            this.title = this.pageTitle.getTitle();
          });
        }
      },
    });
  }

  private revalidateOnWindowFocus() {
    this.windowFocusSubscription = this.wfs.focus$.subscribe((isFocused) => {
      if (isFocused) {
        this.colorScheme.init();
        this.fetchNotificationsSubscription = this.ns.fetchNotifications().subscribe();
      } else {
        this.fetchNotificationsSubscription.unsubscribe();
      }
    });
  }
}
