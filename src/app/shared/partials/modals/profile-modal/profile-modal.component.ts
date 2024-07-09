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
import { AuthService } from '@services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@services/loader.service';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'dashboard-profile-modal',
  standalone: true,
  imports: [InputFieldComponent, ReactiveFormsModule, TextButtonComponent],
  templateUrl: './profile-modal.component.html',
  styles: ``,
})
export class ProfileModalComponent {
  profileFormGroup!: FormGroup;
  formIsSubmitting = false;

  nameController = new FormControl({ value: '', disabled: true });
  emailController = new FormControl({ value: '', disabled: true });
  roleController = new FormControl({ value: '', disabled: true });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private modal: ModalService
  ) {
    this.profileFormGroup = this.fb.group(
      {
        name: this.nameController,
        email: this.emailController,
        role: this.roleController,
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.auth.onCurrentUser().subscribe((currentUser) => {
      this.nameController.setValue(currentUser?.name as string);
      this.emailController.setValue(currentUser?.email as string);
      this.roleController.setValue(currentUser?.roles[0] as string);
    });
  }
  onSubmit() {
    this.formIsSubmitting = true;
    if (this.profileFormGroup.valid) {
      this.loader.start();
      const body = {
        email: this.emailController.value as string,
        password: this.profileFormGroup.value.newPassword,
      };
      this.auth.changePassword(body).subscribe((value) => {
        this.toastr.success(value.message, 'Success');
        this.loader.stop();
        this.modal.close();
      });
    }
  }
}
