import { Component, Input } from '@angular/core';
import { InputFieldComponent } from '../../../../components/auth/input-field/input-field.component';
import { BaseComponent } from '../base.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { SubmitBtnComponent } from '../../../../components/auth/submit-btn/submit-btn.component';
import { ReadonlyInputFieldComponent } from '../../../../components/auth/readonly-input-field/readonly-input-field.component';

@Component({
  selector: 'auth-login',
  standalone: true,
  imports: [
    InputFieldComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    ReadonlyInputFieldComponent,
  ],
  template: `
    <form [formGroup]="loginFormGroup" (ngSubmit)="onLogin()">
      <auth-readonly-input-field
        [control]="emailControl"
        (changeBtnClick)="stage = 'VERIFY_EMAIL'"
        class="mb-3"
      >
      </auth-readonly-input-field>
      <div class="mb-5">
        <auth-input-field
          name="password"
          type="password"
          class="mb-6"
          placeholder="Password"
          [control]="passwordControl"
          [forgetPassword]="true"
          [emailAddress]="emailControl.value"
        ></auth-input-field>
      </div>
      <auth-submit-btn [loading]="loading" text="Sign In"></auth-submit-btn>
    </form>
  `,
})
export class LoginComponent extends BaseComponent {
  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(private authService: AuthService) {
    super();
  }
  ngOnInit(): void {
    this.emailControl = this.loginFormGroup.get('email') as FormControl;
    this.passwordControl = this.loginFormGroup.get('password') as FormControl;
  }
  onLogin() {
    this.loginFormGroup.markAllAsTouched();
    if (this.loginFormGroup.valid) {
      this.loading = true;
      console.log(this.loginFormGroup.value);
      this.authService.signIn(this.loginFormGroup.value).subscribe({
        next: () => {
          alert('Loggin in');
        },
        error: (err) => {
          console.log(err);
          this.passwordControl.setErrors({
            serverError: {
              message: err.error.message,
            },
          });
          this.loading = false;
        },
      });
    }
  }
}
