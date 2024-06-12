import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { matchFields } from '../../../shared/validators/match-fields';
import { ClientStorageService } from '../../../shared/services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '../../../shared/constants';
import { UtilsService } from '../../../shared/services/utils.service';
import { InputFieldComponent } from '../../../shared/components/auth/input-field/input-field.component';
import { SubmitBtnComponent } from '../../../shared/components/auth/submit-btn/submit-btn.component';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, SubmitBtnComponent],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent {
  resetPasswordFormGroup!: FormGroup;
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  passwordConfirmationControl = new FormControl('', [Validators.required]);
  loading = false;

  constructor(
    private fb: FormBuilder,
    private css: ClientStorageService,
    private utils: UtilsService,
    private authService: AuthService,
    private router: Router
  ) {
    const email = this.css.local().get(EMAIL_FOR_RESET_PASSWORD);
    const token = this.utils.getUrlParam('token');

    this.resetPasswordFormGroup = this.fb.group(
      {
        email: [email, [Validators.required, Validators.email]],
        token: [token, [Validators.required]],
        password: this.passwordControl,
        password_confirmation: this.passwordConfirmationControl,
      },
      {
        updateOn: 'submit',
        validators: [matchFields('password', 'password_confirmation')],
      }
    );
    this.css.local().remove(EMAIL_FOR_RESET_PASSWORD);
  }

  onResetPassword() {
    this.resetPasswordFormGroup.markAllAsTouched();

    if (this.resetPasswordFormGroup.valid) {
      this.loading = true;

      this.authService
        .resetPassword(this.resetPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            alert(value.message);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status === 422) {
              alert('Error: Invalid or expired token');
            } else {
              alert(err.message);
            }
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
            this.router.navigateByUrl('/sign-in');
          },
        });
    }
  }
}
