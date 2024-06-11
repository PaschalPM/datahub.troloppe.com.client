import { Component } from '@angular/core';

@Component({
  selector: 'auth-right-box',
  standalone: true,
  imports: [],
  template: `
    <div
      class="float-right mt-1 hidden h-full w-[390px] overflow-hidden border-l border-light-blue border-opacity-35 p-12 lg:table-cell"
    >
      <img src="assets/PasswordImage.png" alt="" />
    </div>
  `,
})
export class RightBoxComponent {}
