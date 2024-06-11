import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { LoginComponent } from './login/login.component';

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

  constructor(private fb: FormBuilder) {
    this.loginFormGroup = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'submit' }
    );
  }
}
