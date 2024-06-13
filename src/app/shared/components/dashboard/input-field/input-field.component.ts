import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UtilsService } from '../../../services/utils.service';
import { CommonModule } from '@angular/common';
import { PwVisibilityIconComponent } from '../../svgs/pw-visibility-icon.component';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { KeyupIgnoreEnterDirective } from '../../../directives/keyup-ignore-enter.directive';

@Component({
  selector: 'dashboard-input-field',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    PwVisibilityIconComponent,
    CapitalizePipe,
    KeyupIgnoreEnterDirective
  ],
  templateUrl: './input-field.component.html',
  styles: `
    :host {
      display: contents;
    }
  `
})
export class InputFieldComponent {
  @ViewChild('myInput') inputElement!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) control = new FormControl();
  @Input({ required: true }) formIsSubmitting!: boolean
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() readonly = false;
  
  @Output() formIsSubmittingChange = new EventEmitter()

  get classStyle() {
    return this.utils.cn(
      'block w-full h-10 rounded-md border outline-none border-gray-600 p-3 py-1 pr-10 text-sm focus:border-none dark:focus:ring-orange-400 disabled:border-gray-300 disabled:bg-gray-100 dark:disabled:bg-gray-700 disabled:focus:outline-none dark:bg-transparent dark:text-gray-200',
      this.errorBorder,
      {
        'text-black/50 dark:text-white/50 border-gray-600/50': this.readonly,
      },
    );
  }
  displayPassword = true;

  get _type() {
    return this.type === 'password'
      ? this.displayPassword
        ? 'password'
        : 'text'
      : this.type;
  }

  get errorBorder() {
    return this.formIsSubmitting && this.control.invalid
      ? 'ring-1 ring-red-500 dark:ring-red-400 border-none'
      : '';
  }

  constructor(public utils: UtilsService) {}

  toggleDisplayPassword() {
    const input = this.inputElement?.nativeElement;
    this.displayPassword = !this.displayPassword;
    input?.focus();
    window.setTimeout(() => {
      input?.setSelectionRange(-1, -1);
    });
  }

  resetFormIsSubmitting() {
    this.formIsSubmitting = false
    this.formIsSubmittingChange.emit(this.formIsSubmitting)
  }
}