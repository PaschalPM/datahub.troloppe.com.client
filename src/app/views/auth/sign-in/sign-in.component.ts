import { Component } from '@angular/core';
import { TimerService } from '../../../shared/services/timer.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  template: `
    <div
      class="relative z-10 m-auto mt-20 w-full max-w-[500px] items-center bg-white shadow-light-blue lg:mt-[7%] lg:flex lg:min-h-[430px] lg:max-w-[845px] lg:shadow-lg"
    >
      <div>Hello World</div>
      <div>Hello World</div>
      <!-- <login-box></login-box>
    <right-box></right-box> -->
    </div>
  `,
  styles: `
    :host {
      display: contents;
    }
  `
})
export class SignInComponent {

  constructor(private timer: TimerService){
    this.timer.countdown(60).subscribe((value) => {
      console.log(value)
    })
  }
}
