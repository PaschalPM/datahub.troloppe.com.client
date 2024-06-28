import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { UtilsService } from '../../../shared/services/utils.service';
import { SideMenuComponent } from '../../../shared/components/dashboard/side-menu/side-menu.component';
import { NavbarComponent } from '../../../shared/components/dashboard/navbar/navbar.component';
import { MediaQueryService } from '../../../shared/services/media-query.service';
import { Title } from '@angular/platform-browser';
import { AppEventEmitterService } from '../../../shared/services/app-event-emitter.service';
import { ColorSchemeService } from '../../../shared/services/color-scheme.service';
import { TOGGLE_SIDE_MENU } from '../../../shared/constants/event-keys';
import { EXTRA_LARGE } from '../../../shared/constants/media-query';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { WindowFocusService } from '../../../shared/services/window-focus.service';
import { Subscription } from 'rxjs';
import { StreetDataService } from '../../../shared/services/street-data.service';
import { NewStreetDataFormService } from '../../../shared/services/new-street-data-form.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, SideMenuComponent, NavbarComponent, ModalComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  isMenuOpened = false;
  title = 'Home';
  isProfileDropdownOpen = false;

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
    public utils: UtilsService,
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
    this.fetchNotificationsSubscription = this.ns.fetchNotifications();

    // Revalidate ColorScheme and Notifications on Window Focus
    this.revalidateOnWindowFocus();

    // Initializes all street data needed for street data form
    this.nsdfs.onInit()
  }

  ngOnDestroy(): void {
    this.windowFocusSubscription.unsubscribe();
    this.fetchNotificationsSubscription.unsubscribe();
  }

  private responsiveLayoutObserver() {
    this.mediaQuery.observe(EXTRA_LARGE).subscribe({
      next: (matches) => {
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
        this.fetchNotificationsSubscription = this.ns.fetchNotifications();
      } else {
        this.fetchNotificationsSubscription.unsubscribe();
      }
    });
  }
}
