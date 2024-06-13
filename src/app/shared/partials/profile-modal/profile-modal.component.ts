import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../components/dashboard/input-field/input-field.component';
import { TextButtonComponent } from '../../components/common/text-button/text-button.component';

@Component({
  selector: 'dashboard-profile-modal',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, TextButtonComponent],
  templateUrl: './profile-modal.component.html',
  styles: ``,
})
export class ProfileModalComponent {
  nameFormControl = new FormControl({ value: 'Paschal', disabled: true });
  emailFormControl = new FormControl({
    value: 'paschal.okafor@troloppe.com',
    disabled: true,
  });
  roleFormControl = new FormControl({ value: 'Admin', disabled: true });
  newPasswordFormControl = new FormControl('', {
    validators: [Validators.required, Validators.minLength(8)],
  });

  myForm = new FormGroup(
    {
      newPassword: this.newPasswordFormControl,
    },
    { updateOn: 'submit' }
  );

  formIsSubmitting = false;


  onSubmit() {
    this.formIsSubmitting = true;
    if (this.myForm.valid) {

      alert('ok');
    }
  }
}
