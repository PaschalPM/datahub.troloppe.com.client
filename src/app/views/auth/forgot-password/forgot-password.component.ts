import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../shared/components/auth/input-field/input-field.component';
import { SubmitBtnComponent } from '../../../shared/components/auth/submit-btn/submit-btn.component';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [InputFieldComponent, SubmitBtnComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordFormGroup!: FormGroup;
  emailControl!: FormControl;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    const emailAddress = this.router.getCurrentNavigation()?.extras
      .state as unknown as FormControl;
    this.emailControl = new FormControl(emailAddress, [
      Validators.required,
      Validators.email,
    ]);
    this.forgotPasswordFormGroup = this.fb.group({
      email: this.emailControl,
    });
  }

  onSendResetLinkMail() {
    this.forgotPasswordFormGroup.markAllAsTouched();

    if (this.forgotPasswordFormGroup.valid) {
      this.loading = true;
      this.authService
        .forgotPassword(this.forgotPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            alert(value.message);
            this.loading = false;
          },
          error: (err) => {
            console.error(err.error.message);
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
