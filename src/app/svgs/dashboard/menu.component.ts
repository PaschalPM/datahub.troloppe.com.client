import { Component } from '@angular/core';

@Component({
  selector: 'svg-menu',
  standalone: true,
  imports: [],
  template: `
    <svg width="16" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 11h8M1 6h14M1 1h8"
        stroke-width="2"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  `,
  styles: `
    path {
      @apply dark:stroke-white;
    }
  `,
})
export class MenuComponent {}
