import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../../services/utils.service';
import { MyMatIconComponent } from '../my-mat-icon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'text-button',
  standalone: true,
  imports: [MyMatIconComponent, NgIf],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      [class]="
        utils.cn(
          'rounded-2xl text-xs md:text-sm p-4 py-2 flex items-center gap-1 font-medium tracking-wider text-dodger-blue hover:bg-dodger-blue/10 dark:text-orange-400 dark:hover:bg-orange-400/15 disabled:bg-slate-300 disabled:text-slate-400 disabled:dark:bg-slate-700 disabled:dark:text-slate-800',
          class,
          {
            'p-2 py-1 text-xs font-normal': small
          },
          {
            'text-red-500 dark:text-red-400 dark:hover:bg-red-400/15 hover:bg-red-500/15': isError
          }
        )
      "
      (click)="onClick($event)"
    >
      <my-mat-icon *ngIf="withIcon" class="font-black">{{
        withIcon
      }}</my-mat-icon>
      <span [class]="utils.cn({ 'hidden md:inline': isFlexed })">
        @if (small) {
        {{ text }}
        } @else {
        {{ text.toUpperCase() }}
        }
      </span>
    </button>
  `,
})
export class TextButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() class = '';
  @Input() type: 'button' | 'submit' | 'reset' | 'menu' = 'button';
  @Input() small = false;
  @Input() withIcon = '';
  @Input() isFlexed = false;
  @Input() disabled = false;
  @Input() isError = false;

  @Output() clickEvent = new EventEmitter();

  constructor(public utils: UtilsService) {}

  onClick(event: Event) {
    this.clickEvent.emit(event);
  }
}
