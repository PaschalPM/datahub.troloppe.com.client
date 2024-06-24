import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';

@Component({
  selector: 'dashboard-menu-item-link',
  standalone: true,
  imports: [RouterModule, MyMatIconComponent],
  template: `
    <li>
      <a
        [routerLink]="link"
        routerLinkActive="router-active"
        [routerLinkActiveOptions]="{ exact: link === '/dashboard' || false }"
        class="inline-flex w-full items-center gap-2 p-4"
      >
        <my-mat-icon> {{ matIcon }} </my-mat-icon>
        <span class="hidden md:inline"> {{ label }}</span>
      </a>
    </li>
  `,
})
export class MenuItemLinkComponent {
  @Input({ required: true }) link!: string;
  @Input({ required: true }) label!: string;
  @Input() matIcon = '';
}
