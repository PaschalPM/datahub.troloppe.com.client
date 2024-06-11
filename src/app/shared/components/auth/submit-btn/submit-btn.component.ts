import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpinnerComponent } from '../../svgs/spinner.component';

@Component({
  selector: 'auth-submit-btn',
  standalone: true,
  imports: [NgIf, SpinnerComponent],
  template: `
    <div *ngIf="!loading">
      <button
        type="submit"
        class="w-full rounded-md bg-dodger-blue p-2 text-center font-medium text-white active:brightness-110"
      >
        {{ text }}
      </button>
    </div>

    <div *ngIf="loading" class="w-full text-center">
      <button
        type="button"
        class="rounded-full bg-dodger-blue p-1 text-center font-medium text-white"
      >
        <spinner></spinner>
      </button>
    </div>
  `,
})
export class SubmitBtnComponent {
  @Input({ required: true }) loading = false;
  @Input({ required: true }) text = '';
}
