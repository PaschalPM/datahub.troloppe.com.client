import { Component, Input } from '@angular/core';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `<div
    [class]="
      utils.cn(
        'loader-spinner size-24 border-4 rounded-full border-r-transparent border-l-transparent',
        class
      )
    "
  ></div>`,
})
export class SpinnerComponent {
  @Input() class = '';
  constructor(public utils: UtilsService) {}
}
