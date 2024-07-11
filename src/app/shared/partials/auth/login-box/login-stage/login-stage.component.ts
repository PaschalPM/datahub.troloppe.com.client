import { Component, ViewChild } from '@angular/core';
import { InputFieldComponent } from '../../../../components/auth/input-field/input-field.component';
import { BaseComponent } from '../base.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { SubmitBtnComponent } from '../../../../components/auth/submit-btn/submit-btn.component';
import { ReadonlyInputFieldComponent } from '../../../../components/auth/readonly-input-field/readonly-input-field.component';
import { ClientStorageService } from '../../../../services/client-storage.service';
import { EMAIL_FOR_RESET_PASSWORD } from '../../../../constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'auth-login-stage',
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
        (changeBtnClick)="onChangeStage()"
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
          [emailForResetLink]="emailControl.value"
          [(formIsSubmitting)]="formIsSubmitting"
        ></auth-input-field>
      </div>
      <auth-submit-btn [loading]="loading" text="Sign In"></auth-submit-btn>
    </form>
  `,
})
export class LoginStageComponent extends BaseComponent {
  @ViewChild(InputFieldComponent)
  inputFieldComponent!: InputFieldComponent
  
  emailControl!: FormControl;
  passwordControl!: FormControl;

  constructor(
    private authService: AuthService,
    private css: ClientStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    super();
  }
  ngOnInit(): void {
    this.emailControl = this.loginFormGroup.get('email') as FormControl;
    this.passwordControl = this.loginFormGroup.get('password') as FormControl;
  }

  ngAfterViewInit(): void {
    this.inputFieldComponent.inputFocus();
  }

  onChangeStage() {
    this.stage = 'VERIFY_EMAIL';
    this.stageChange.emit(this.stage);
  }

  onLogin() {
    this.formIsSubmitting = true;
    if (this.loginFormGroup.valid) {
      this.loading = true;
      this.authService.signIn(this.loginFormGroup.value).subscribe({
        next: () => {
          this.toastr.success('Successfully logged in.', 'Success');
          this.css.local().remove(EMAIL_FOR_RESET_PASSWORD);
          this.activatedRoute.queryParams.subscribe((params) => {
            if (params['returnUrl']) {
              this.router.navigateByUrl(params['returnUrl']);
            } else {
              this.router.navigateByUrl('/dashboard');
            }
          });
        },
        error: (err) => {
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
