import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'login-box-base',
  template: ``,
})
export class BaseComponent {
  @Input({ required: true }) stage: LoginStageType = 'VERIFY_EMAIL';
  @Output() stageChange = new EventEmitter<LoginStageType>();
  @Input({ required: true }) loginFormGroup!: FormGroup;

  loading = false;
  formIsSubmitting = false
}
