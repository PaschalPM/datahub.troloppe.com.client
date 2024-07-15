import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'dashboard-submit-btn',
  standalone: true,
  imports: [MyMatIconComponent, NgIf],
  template: `
    <button
      type="submit"
      [id]="id"
      [class]="styleClasses"
      [disabled]="isLoading"
      (click)="onClick($event)"
    >
      <span class="uppercase"> <ng-content></ng-content> </span>

      <my-mat-icon *ngIf="isLoading" class="animate-spin">
        settings
      </my-mat-icon>
    </button>
  `,
})
export class SubmitBtnComponent {
  @Input({required: true}) id!: string
  @Input() isLoading = false;
  @Input() variant : 'default' | 'text' = 'default'

  get styleClasses(){
    return this.variant === 'default' ? 'rounded-sm text-xs md:text-sm p-4 py-2 font-medium tracking-wider bg-dodger-blue hover:bg-dodger-blue/70 dark:bg-orange-400 dark:hover:bg-orange-400/70 dark:text-black text-white disabled:bg-gray-300 disabled:dark:bg-gray-800 disabled:dark:text-gray-500 flex justify-center items-center gap-2' : 'rounded-md text-xs md:text-sm p-4 py-2  flex items-center gap-1 font-medium tracking-wider text-dodger-blue hover:bg-dodger-blue/10 dark:text-orange-400 dark:hover:bg-orange-400/15 disabled:bg-slate-300 disabled:text-slate-400 disabled:dark:bg-slate-700 disabled:dark:text-slate-800'
  }

  @Output() clickEvent = new EventEmitter()

  onClick(event: Event){
    this.clickEvent.emit(event)
  }
}


          
      