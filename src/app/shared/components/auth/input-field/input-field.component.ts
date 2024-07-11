import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { PwVisibilityIconComponent } from '../../svgs/pw-visibility-icon.component';
import { RouterModule } from '@angular/router';
import { KeyupIgnoreEnterDirective } from '../../../directives/keyup-ignore-enter.directive';

@Component({
  selector: 'auth-input-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    CapitalizePipe,
    PwVisibilityIconComponent,
    RouterModule,
    KeyupIgnoreEnterDirective,
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
  @Input({ required: true }) formIsSubmitting!: boolean;
  @Input() placeholder = '';
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() class = '';
  @Input() forgetPassword = false;
  @Input() emailForResetLink!: string;

  @Output() formIsSubmittingChange = new EventEmitter();

  @ViewChild('passwordInputElement', {static: false})
  passwordInputElement!: ElementRef<HTMLInputElement>;

  @ViewChild('nonPasswordInputElement', {static: false})
  nonPasswordInputElement!: ElementRef<HTMLInputElement>;

  displayPassword = true;

  get classStyles() {
    return {
      input: this.utils.cn(
        'bg-transparent p-2 bg-lighter-blue px-3 text-base w-full rounded-sm border focus:border-none',
        {
          'ring-2 ring-red-500 border-none': this.errorCondition,
        }
      ),
      inputBorder: 'relative z-10',
    };
  }

  get errorCondition() {
    return this.control.invalid && this.formIsSubmitting;
  }

  get dynamicType() {
    return this.type === 'password'
      ? this.displayPassword
        ? 'password'
        : 'text'
      : this.type;
  }

  constructor(public utils: UtilsService) {}

  resetFormIsSubmitting() {
    this.formIsSubmitting = false;
    this.formIsSubmittingChange.emit(this.formIsSubmitting);
  }

  toggleVisibility() {
    this.displayPassword = !this.displayPassword;
    setTimeout(() => {
      this.passwordInputElement?.nativeElement.focus();
      this.passwordInputElement?.nativeElement.setSelectionRange(-1, -1);
    });
  }

  inputFocus() {
    if (this.type === 'password') {
      this.passwordInputElement.nativeElement.focus();
    } else {
      this.nonPasswordInputElement.nativeElement.focus();
    }
  }
}
