import { Component } from '@angular/core';
import { MenuItemLinkComponent } from '../menu-item-link/menu-item-link.component';

@Component({
  selector: 'dashboard-side-menu',
  standalone: true,
  imports: [MenuItemLinkComponent],
  template: `
    <aside
  class="sticky bottom-0 top-0 flex min-h-screen shrink-0 basis-[55px] flex-col bg-violet-blue text-white dark:bg-gray-900 md:basis-[200px]"
>
  <div class="h-20">
    <span class="hidden md:inline"> DataHUB </span>
    <span class="md:hidden"> D </span>
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
  styles: `
    :host {
      display: contents;
    }
  `
})
export class SideMenuComponent {

}
