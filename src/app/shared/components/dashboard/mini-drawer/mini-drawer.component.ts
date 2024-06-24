import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'dashboard-mini-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        #toggleBtn
        class="-mt-2 font-medium md:hidden"
        (click)="toggleMiniDrawer()"
      >
        ...
      </button>
      <div
        #drawerContent
        *ngIf="showMiniDrawer"
        class="absolute right-2 top-6 min-h-10 min-w-32 bg-white p-4 text-left text-sm shadow-lg dark:bg-gray-800 md:hidden"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``,
})
export class MiniDrawerComponent {
  @Input({ required: true }) showMiniDrawer = false;
  @Output() showMiniDrawerChange = new EventEmitter();
  @ViewChild('toggleBtn') toggleBtnRef!: ElementRef;
  @ViewChild('drawerContent') drawerContentRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  closeMiniDrawer(event: Event) {
    const clickedToggleBtn = this.toggleBtnRef?.nativeElement.contains(
      event.target,
    );
    const clickedDrawerContent = this.drawerContentRef?.nativeElement.contains(
      event.target,
    );

    if (!(clickedToggleBtn || clickedDrawerContent)) {
      this.showMiniDrawer = false;
      this.showMiniDrawerChange.emit(this.showMiniDrawer);
    }
  }

  toggleMiniDrawer() {
    this.showMiniDrawer = !this.showMiniDrawer;
    this.showMiniDrawerChange.emit(this.showMiniDrawer);
  }
}
