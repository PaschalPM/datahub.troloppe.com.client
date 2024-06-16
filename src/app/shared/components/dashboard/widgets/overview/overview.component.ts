import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '../../../common/my-mat-icon.component';

@Component({
  selector: 'dashboard-widget-overview',
  standalone: true,
  imports: [MyMatIconComponent],
  template: `
    <div
      class="rounded-lg bg-white p-4 shadow-md backdrop-blur-lg dark:bg-white/20 dark:shadow-sm dark:shadow-white/50 dark:backdrop-blur-md"
    >
      <div>
        <h2 class="text-2xl font-medium">{{ totalSum }}</h2>
        <small class="text-black/60 dark:text-white/60">
          {{ overviewTitle }}
        </small>
      </div>
      <div class="text-right ">
        <my-mat-icon class="dark:text-orange-300/50"> {{ myMatIcon }} </my-mat-icon>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class OverviewComponent {
  @Input({ required: true }) totalSum = 0;
  @Input({ required: true }) overviewTitle = '';
  @Input({ required: true }) myMatIcon = '';
}
