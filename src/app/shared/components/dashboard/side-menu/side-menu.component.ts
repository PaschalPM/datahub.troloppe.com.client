import { Component, Input } from '@angular/core';
import { MenuItemLinkComponent } from '../menu-item-link/menu-item-link.component';
import { UtilsService } from '@services/utils.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'dashboard-side-menu',
  standalone: true,
  imports: [MenuItemLinkComponent, RouterModule],
  template: `
    <aside
      [class]="utils.cn('bg-violet-blue text-white dark:bg-gray-900', cls)"
    >
      <div class="h-20">
        <a class="hidden dark:bg-slate-800 m-1 border dark:border-slate-600 md:flex py-3" routerLink="/">
          <img src="assets/WhiteDataHUBLogo.svg" class="m-auto"  alt="logo" />
        </a>
        <a class="md:hidden flex py-4" routerLink="/">
          <img src="assets/SmallLogo.png" class="m-auto" alt="logo" />
        </a>
      </div>
      <div class="flex grow flex-col">
        <nav class="mb-10 overflow-auto">
          <ul>
            <dashboard-menu-item-link
              matIcon="home"
              label="Home"
              link="/dashboard"
            ></dashboard-menu-item-link>
            <dashboard-menu-item-link
              matIcon="streetview"
              label="Street Data"
              link="/dashboard/street-data"
            ></dashboard-menu-item-link>
          </ul>
        </nav>
        <nav class="overflow-auto">
          <ul>
            <dashboard-menu-item-link
              matIcon="notifications"
              label="Notifications"
              link="/dashboard/notifications"
            ></dashboard-menu-item-link>
          </ul>
        </nav>
      </div>
    </aside>
  `,
  host: {
    '[style.display]': "'contents'",
  },
})
export class SideMenuComponent {
  @Input() cls!: string;

  constructor(public utils: UtilsService, private router: Router) {}
}
