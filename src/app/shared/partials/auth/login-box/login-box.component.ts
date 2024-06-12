import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-login-box',
  standalone: true,
  imports: [VerifyEmailComponent, LoginComponent],
  templateUrl: './login-box.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})

export class LoginBoxComponent {
  loginFormGroup!: FormGroup;
  stage: LoginStageType = 'VERIFY_EMAIL';

  constructor(private fb: FormBuilder, private router: Router) {

    const emailForResetLink = this.router.getCurrentNavigation()?.extras.state?.['emailForResetLink']
    if (emailForResetLink){
      this.stage = 'LOGIN_STAGE'
    }

    this.loginFormGroup = this.fb.group(
      {
        email: [emailForResetLink, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'submit' }
    );
  }
}
