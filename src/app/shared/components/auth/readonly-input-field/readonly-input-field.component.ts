import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'auth-readonly-input-field',
  standalone: true,
  imports: [],
  template: `
    <div class="w-fit" [class]="class">
      <div
        class="relative z-10 inline-flex w-fit items-center gap-4 rounded-sm border p-3 py-2 font-medium"
      >
        <span class="text-sm lg:text-base">
          {{ control.value }}
        </span>
        <button
          type="button"
          (click)="emitClickEvent($event)"
          class="text-sm text-dodger-blue"
        >
          Change
        </button>
      </div>
    </div>
  `,
})
export class ReadonlyInputFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() class = '';
  @Output() changeBtnClick = new EventEmitter<Event>();
  emitClickEvent(event: Event) {
    this.changeBtnClick.emit(event);
  }
}
