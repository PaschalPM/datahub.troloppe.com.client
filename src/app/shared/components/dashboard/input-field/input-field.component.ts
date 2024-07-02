import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
    KeyupIgnoreEnterDirective,
  ],
  templateUrl: './input-field.component.html',
  styles: `
    :host {
      display: contents;
    }
  `,
})
export class InputFieldComponent {
  @ViewChild('myInput') inputElement!: ElementRef<HTMLInputElement>;
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input() formIsSubmitting!: boolean;
  @Input() type:
    | 'text'
    | 'email'
    | 'password'
    | 'number'
    | 'number-list'
    | 'checkbox'
    | 'textarea' = 'text';
  @Input() readonly = false;
  @Input() maxLength = 250;

  @Output() formIsSubmittingChange = new EventEmitter();

  isRequired = false;
  control!: FormControl;
  currentLength = 0;

  get classStyle() {
    return this.utils.cn(
      'block w-full h-10 rounded-md  border outline-none border-slate-200 dark:border-slate-600 p-3 py-1 px-2 text-sm focus:border-none focus:ring-dodger-blue dark:focus:ring-orange-400 disabled:border-gray-300 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:focus:outline-none bg-slate-100 dark:bg-slate-600 dark:text-gray-200',
      this.errorBorder,
      {
        'text-black/50 dark:text-white/50 border-gray-600/50': this.readonly,
      }
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

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.isRequired = this.control.hasValidator(Validators.required);
    this.control.valueChanges.subscribe((value) => {
      if (value) {
        const valueLength = value.length;
        if (valueLength) {
          this.currentLength = valueLength;
        }
      }
    });
  }

  toggleDisplayPassword() {
    const input = this.inputElement?.nativeElement;
    this.displayPassword = !this.displayPassword;
    input?.focus();
    window.setTimeout(() => {
      input?.setSelectionRange(-1, -1);
    });
  }

  onKeyUp() {
    this.control.setErrors(null);
  }

  // -----> For Number List Type
  onInput(ev: Event) {
    const event = ev as InputEvent;
    const target = ev.target as HTMLInputElement;
    this.currentLength = target.value.length;

    if (this.type === 'number-list') {
      if (event.data?.match(/[A-Za-z]/g)) {
        const v = target.value.slice(0, -1);
        this.control.setValue(v);
      }
    }

    if (this.currentLength > this.maxLength) {
      this.control.setValue(target.value.slice(0, -1));
    }
  }
}
