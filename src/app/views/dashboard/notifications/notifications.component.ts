import { Component } from '@angular/core';
import { UtilsService } from '../../../shared/services/utils.service';
import { NotificationsService } from '../../../shared/services/notifications.service';
import { NotificationItemComponent } from '../../../shared/components/dashboard/notification-item/notification-item.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { PaneNavigatorPanelComponent } from '../../../shared/components/pane-navigator-panel/pane-navigator-panel.component';
import { SpinnerComponent } from '../../../shared/components/svgs/spinner.component';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { ModalService } from '@services/modal.service';
import { ConfirmModalComponent } from '@partials/modals/confirm-modal/confirm-modal.component';
import { LoaderService } from '@services/loader.service';

type PaneType = 'unreadNotifications' | 'allNotifications';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NotificationItemComponent,
    NgIf,
    AsyncPipe,
    PaneNavigatorPanelComponent,
    SpinnerComponent,
    MyMatIconComponent,
  ],
  templateUrl: './notifications.component.html',
  styles: `
    .empty-state {
      @apply mt-16 p-2 py-4 flex justify-center font-medium pb-12;
    }
  `,
})
export class NotificationsComponent {
  allNotifications: NotificationType[] | undefined = undefined;
  error: string | null = null;
  activePane: PaneType = 'unreadNotifications';
  confirmDeleteAllNotificationsModalPropsData: ConfirmModalPropsType = {
    matIconName: 'delete',
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete all notifications?',
    ok: () => {
      this.ns.deleteAll().subscribe();
    },
  };

  get unreadNotifications(): NotificationType[] | undefined {
    return this.allNotifications?.filter((value) => !value.is_read);
  }

  get activeNotifications() {
    return this.activePane === 'unreadNotifications'
      ? this.unreadNotifications
      : this.allNotifications;
  }

  get noNotificationText() {
    return this.activePane === 'unreadNotifications'
      ? 'No Unread Notifications...'
      : 'No Notifications...';
  }

  get tabs() {
    return [
      {
        pane: 'unreadNotifications',
        tabLabel: `Unread (${this.unreadNotificationSum})`,
      },
      {
        pane: 'allNotifications',
        tabLabel: `All (${this.allNotificationSum})`,
      },
    ];
  }

  private get allNotificationSum(): number {
    const allNotifications = this.allNotifications;
    return allNotifications ? allNotifications.length : 0;
  }

  private get unreadNotificationSum(): number {
    const unreadNotifications = this.unreadNotifications;
    return unreadNotifications ? unreadNotifications.length : 0;
  }

  constructor(
    public utils: UtilsService,
    public ns: NotificationsService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.ns.notifications$.subscribe({
      next: (notifications) => {
        this.error = null;
        this.allNotifications = notifications;
      },
      error: (err) => {
        this.error = err;
        this.allNotifications = undefined;
      },
    });
  }

  markAsRead(notification: NotificationType) {
    this.ns.updateNotification(notification).subscribe();
  }

  deleteAll() {
    this.modalService.open(
      ConfirmModalComponent,
      this.confirmDeleteAllNotificationsModalPropsData
    );
  }
}
