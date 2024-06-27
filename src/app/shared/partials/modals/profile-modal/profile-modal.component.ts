import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../components/dashboard/input-field/input-field.component';
import { TextButtonComponent } from '../../../components/common/text-button/text-button.component';

@Component({
  selector: 'dashboard-profile-modal',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, TextButtonComponent],
  templateUrl: './profile-modal.component.html',
  styles: ``,
})
export class ProfileModalComponent {
  profileFormGroup!: FormGroup
  formIsSubmitting = false;

  constructor(private fb: FormBuilder){
    this.profileFormGroup = this.fb.group(  {
      name: [{value: 'Paschal', disabled: true}],
      email: [{value: 'paschal.okafor@troloppe.com', disabled: true}],
      role: [{value: 'Admin', disabled: true}],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    },
    { updateOn: 'submit'})
  }
  onSubmit() {
    this.formIsSubmitting = true;
    if (this.profileFormGroup.valid) {

      alert('ok');
    }
  }
}
