import { Component } from '@angular/core';
import { BaseComponent } from '../base.component';
import { SubmitBtnComponent } from '../../../../components/auth/submit-btn/submit-btn.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputFieldComponent } from '../../../../components/auth/input-field/input-field.component';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'auth-verify-email',
  standalone: true,
  imports: [SubmitBtnComponent, InputFieldComponent, ReactiveFormsModule],
  template: `
    <form [formGroup]="loginFormGroup" (ngSubmit)="onVerifyEmail()">
      <auth-input-field
        name="email"
        type="email"
        class="mb-4"
        placeholder="Email address"
        [control]="emailControl"
      ></auth-input-field>
      <auth-submit-btn [loading]="loading" text="Next"></auth-submit-btn>
    </form>
  `,
})
export class VerifyEmailComponent extends BaseComponent {
  emailControl!: FormControl;

  constructor(private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.emailControl = this.loginFormGroup.get('email') as FormControl;
  }
  onVerifyEmail() {
    this.loginFormGroup.markAllAsTouched();
    if (this.emailControl.valid) {
      this.loading = true;
      this.authService.verifyUserByEmail(this.loginFormGroup.value).subscribe({
        next: () => {
          this.stage = 'VERIFY_PASSWORD';
          this.stageChange.emit(this.stage);
          this.loginFormGroup.markAsUntouched()
        },
        error: (err) => {
          this.emailControl.setErrors({
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
