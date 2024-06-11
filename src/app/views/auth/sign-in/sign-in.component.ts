import { Component } from '@angular/core';
import { LoginBoxComponent } from '../../../shared/partials/auth/login-box/login-box.component';
import { RightBoxComponent } from '../../../shared/partials/auth/right-box/right-box.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [LoginBoxComponent, RightBoxComponent],
  template: `
    <div
      class="relative z-10 m-auto mt-20 w-full max-w-[500px] items-center bg-white shadow-light-blue lg:mt-[7%] lg:flex lg:min-h-[430px] lg:max-w-[845px] lg:shadow-lg"
    >
      <auth-login-box></auth-login-box>
      <auth-right-box></auth-right-box>
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class SignInComponent {
}
