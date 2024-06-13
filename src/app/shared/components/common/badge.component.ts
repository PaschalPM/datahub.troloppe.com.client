import { Component } from '@angular/core';

@Component({
  selector: 'badge',
  standalone: true,
  imports: [],
  template: `
    <span
      class="absolute -top-3 -right-2 flex items-center justify-center size-5 rounded-full ring-1 ring-white bg-red-500 text-white text-xs text-center leading-4"
    >
      <ng-content></ng-content>
    </span>
  `,
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class BadgeComponent {}
