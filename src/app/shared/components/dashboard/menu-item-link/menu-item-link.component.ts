import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { NotificationsService } from '@services/notifications.service';
import { AsyncPipe } from '@angular/common';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'dashboard-menu-item-link',
  standalone: true,
  imports: [RouterModule, MyMatIconComponent, AsyncPipe],
  template: `
    <li>
      <a
        [routerLink]="link"
        routerLinkActive="router-active"
        [routerLinkActiveOptions]="{ exact: link === '/dashboard' || false }"
        [class]="utils.cn('inline-flex w-full items-center gap-2 p-4', {
          'pb-2 pt-5':isNotification
        })"
      >
        @if(isNotification){
        <my-mat-icon
          aria-hidden="false"
          [badge]="ns.unreadCount | async"
          [badgeHidden]="(ns.unreadCount | async) === 0"
        >
          notifications
        </my-mat-icon>
        } @else {

        <my-mat-icon> {{ matIcon }} </my-mat-icon>
        }
        <span class="hidden md:inline"> {{ label }}</span>
      </a>
    </li>
  `,
})
export class MenuItemLinkComponent {
  @Input({ required: true }) link!: string;
  @Input({ required: true }) label!: string;
  @Input() matIcon = '';

  get isNotification() {
    return (
      this.matIcon === 'notifications' && this.link.endsWith('notifications')
    );
  }

  constructor(public ns: NotificationsService, public utils: UtilsService){}
}
