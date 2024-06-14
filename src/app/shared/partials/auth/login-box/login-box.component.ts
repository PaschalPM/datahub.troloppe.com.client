import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifyEmailStageComponent } from './verify-email-stage/verify-email-stage.component';
import { LoginStageComponent } from './login-stage/login-stage.component';
import { ClientStorageService } from '../../../services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '../../../constants';

@Component({
  selector: 'auth-login-box',
  standalone: true,
  imports: [VerifyEmailStageComponent, LoginStageComponent],
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

  constructor(
    private fb: FormBuilder,
    private css: ClientStorageService
  ) {
    this.loginFormGroup = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    const emailForResetLink = this.css.local().get(EMAIL_FOR_RESET_PASSWORD);
    if (emailForResetLink) {
      this.stage = 'LOGIN_STAGE';
    }

    this.loginFormGroup
      .get('email')
      ?.setValue(emailForResetLink);

    this.css.local().remove(EMAIL_FOR_RESET_PASSWORD)
  }
}
