import { Component } from '@angular/core';

@Component({
  selector: 'dashboard-widget-overview',
  standalone: true,
  imports: [],
  template: `
    <div
      class="rounded-lg bg-white p-4 shadow-md backdrop-blur-lg dark:bg-white/20 dark:shadow-sm dark:shadow-white/50 dark:backdrop-blur-md"
    >
      <div>
        <h2 class="text-2xl font-medium">350</h2>
        <small class="text-black/60 dark:text-white/60"
          >Total Street Data</small
        >
      </div>
      <div class="text-right ">
        <!-- <mat-icon> streetview </mat-icon> -->
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class OverviewComponent {}
