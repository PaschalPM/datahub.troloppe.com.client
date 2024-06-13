import { Component } from '@angular/core';
import { TOGGLE_SIDE_MENU } from '../../../constants/event-keys';
import { AppEventEmitterService } from '../../../services/app-event-emitter.service';
import { MenuComponent } from '../../../svgs/dashboard/menu.component';

@Component({
  selector: 'dashboard-menu-toggler',
  standalone: true,
  imports: [MenuComponent],
  template: `
    <button (click)="toggleIsMenuOpened()" class="inline-block p-2">
      <svg-menu></svg-menu>
    </button>
  `,
  styles: ``,
})
export class MenuTogglerComponent {
  isMenuOpened = false;

  constructor(private appEventEmitter: AppEventEmitterService) {}

  ngOnInit(): void {
    this.appEventEmitter.listen(TOGGLE_SIDE_MENU, (state: boolean) => {
      this.isMenuOpened = state;
    });
  }
  toggleIsMenuOpened() {
    this.isMenuOpened = !this.isMenuOpened;
    this.appEventEmitter.emit(TOGGLE_SIDE_MENU, this.isMenuOpened);
  }
}