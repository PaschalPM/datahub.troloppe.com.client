import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { PwVisibilityIconComponent } from '../../svgs/pw-visibility-icon.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'auth-input-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CapitalizePipe,
    PwVisibilityIconComponent,
    RouterModule,
  ],
  templateUrl: './input-field.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class InputFieldComponent {
  @Input({ required: true }) control!: FormControl;
  @Input({ required: true }) name!: string;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() class = '';
  @Input() forgetPassword = false;
  @Input() emailForResetLink!: string;

  @ViewChild('passwordInputElement')
  passwordInputElement!: ElementRef<HTMLInputElement>;

  displayPassword = true;

  classStyles = {
    input:
      'bg-transparent p-2 px-3 text-base w-full focus:outline-none border-none transition-all duration-300 ease-in-out',
    inputBorder: 'border bg-lighter-blue relative z-10 rounded-sm',
    errorBorder: 'border-red-500 border-2',
  };

  get errorCondition() {
    return this.control.invalid && this.control.touched;
  }

  get errorBorder() {
    return this.errorCondition
      ? this.classStyles.errorBorder
      : 'border-light-blue';
  }

  get dynamicType() {
    return this.type === 'password'
      ? this.displayPassword
        ? 'password'
        : 'text'
      : this.type;
  }

  constructor(public utils: UtilsService) {}

  toggleVisibility() {
    this.displayPassword = !this.displayPassword;
    setTimeout(() => {
      this.passwordInputElement?.nativeElement.focus();
      this.passwordInputElement?.nativeElement.setSelectionRange(-1, -1);
    });
  }
}
