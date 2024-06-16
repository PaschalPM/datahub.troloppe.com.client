import { Component, Input } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'dashboard-chart-container',
  standalone: true,
  imports: [],
  template: `
    <div
      [class]="
        utils.cn(
          'flex my-4 justify-between gap-4 items-center rounded-lg w-[99%] flex-wrap bg-white p-4 dark:bg-white/20 dark:shadow-sm dark:shadow-white/50 dark:backdrop-blur-md',
          class
        )
      "
    >
      <ng-content> </ng-content>
    </div>
  `,
})
export class ChartContainerComponent {
  @Input() class = '';
  constructor(public utils: UtilsService) {}
}
