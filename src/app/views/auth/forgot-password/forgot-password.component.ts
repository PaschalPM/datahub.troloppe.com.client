import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationStart, Router } from '@angular/router';
import { InputFieldComponent } from '../../../shared/components/auth/input-field/input-field.component';
import { SubmitBtnComponent } from '../../../shared/components/auth/submit-btn/submit-btn.component';
import { AuthService } from '../../../shared/services/auth.service';
import { ClientStorageService } from '../../../shared/services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '../../../shared/constants';

@Component({
  selector: 'auth-forgot-password',
  standalone: true,
  imports: [InputFieldComponent, SubmitBtnComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  forgotPasswordFormGroup!: FormGroup;
  emailControl!: FormControl;
  loading = false;
  formIsSubmitting = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private css: ClientStorageService
  ) {
    const emailForResetLink = this.router.getCurrentNavigation()?.extras
      .state?.['emailForResetLink'] as unknown as string;

    this.emailControl = new FormControl(emailForResetLink, [
      Validators.required,
      Validators.email,
    ]);
    this.forgotPasswordFormGroup = this.fb.group({
      email: this.emailControl,
    });

    this.setEmailForResetLinkAsStateOnPopstate(emailForResetLink);
  }

  onSendResetLinkMail() {
    this.formIsSubmitting = true

    if (this.forgotPasswordFormGroup.valid) {
      this.loading = true;
      this.authService
        .forgotPassword(this.forgotPasswordFormGroup.value)
        .subscribe({
          next: (value) => {
            alert(value.message);
            const email = this.forgotPasswordFormGroup.get('email')?.value
            this.storeEmailForResetLink(email)
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

  private setEmailForResetLinkAsStateOnPopstate(emailForResetLink: string) {
    this.router.events.subscribe({
      next: (event) => {
        if (event instanceof NavigationStart) {
          if (event.navigationTrigger === 'popstate') {
            this.css.local().set(EMAIL_FOR_RESET_PASSWORD, emailForResetLink)
          }
        }
      },
    });
  }

  private storeEmailForResetLink(emailForResetLink: string){
    this.css.local().set(EMAIL_FOR_RESET_PASSWORD, emailForResetLink)
  }
}
