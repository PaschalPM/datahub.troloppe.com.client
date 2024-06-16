import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { NgIf } from '@angular/common';
import { TextButtonComponent } from '../../common/text-button/text-button.component';
import { MiniDrawerComponent } from '../mini-drawer/mini-drawer.component';

@Component({
  selector: 'dashboard-notification-item',
  standalone: true,
  imports: [MyMatIconComponent, NgIf, TextButtonComponent, MiniDrawerComponent],
  templateUrl: './notification-item.component.html'
})
export class NotificationItemComponent {
  @Input({ required: true }) notification!: NotificationType;
  @Output() markAsReadChange = new EventEmitter();
  showMiniDrawer = false;

  constructor(public utils: UtilsService) {}

  markAsRead(notification: NotificationType) {
    this.markAsReadChange.emit(notification);
    this.showMiniDrawer = false;
  }
}
