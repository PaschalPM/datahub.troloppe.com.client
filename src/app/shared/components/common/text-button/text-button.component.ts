import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';

@Component({
  selector: 'text-button',
  standalone: true,
  imports: [],
  template: `
    <button
      [type]="type"
      [class]="
        utils.cn(
          'rounded-2xl text-xs md:text-sm p-4 py-2 font-medium tracking-wider text-dodger-blue hover:bg-dodger-blue/10 dark:text-orange-400 dark:hover:bg-orange-400/15',
          class,
          {
            'p-2 py-1 text-xs font-normal': small
          }
        )
      "
      (click)="onClick($event)"
    >
      @if (small) {
        {{ text }}
      } @else {
        {{ text.toUpperCase() }}
      }
    </button>
  `,
})
export class TextButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() class = '';
  @Input() type: 'button' | 'submit' | 'reset' | 'menu' = 'button';
  @Input() small = false;
  @Output() clickEvent = new EventEmitter();

  constructor(public utils: UtilsService) {}

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
