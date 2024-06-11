import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  emailAddress!:string

  constructor(private router: Router){
    this.emailAddress = this.router.getCurrentNavigation()?.extras.state as unknown as string
  }
}
