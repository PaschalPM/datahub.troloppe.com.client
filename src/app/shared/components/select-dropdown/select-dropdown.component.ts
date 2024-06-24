import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { DropdownFunctionality } from '../../classes/dropdown-functionality';
import { MyMatIconComponent } from '../common/my-mat-icon.component';

@Component({
  selector: 'select-dropdown',
  standalone: true,
  imports: [
    MyMatIconComponent,
    CapitalizePipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ClickOutsideDirective,
  ],
  templateUrl: './select-dropdown.component.html',
})
export class SelectDropdownComponent extends DropdownFunctionality {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) options: Array<OptionType> = [];
  @Input({ required: true }) formIsSubmitting!: boolean;
  @Input({ required: true }) formGroup!: FormGroup;

  @Input() readonly: boolean = false;
  @Input() isSearchable: boolean = false;

  @Output() selectedValueChange = new EventEmitter();

  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLElement>;

  control = new FormControl();
  selectedOption: OptionType | null = null;
  isRequired: boolean = false;
  qString = '';

  get filteredOptions() {
    const options = this.options.filter(({ value }: OptionType) =>
      value.toLowerCase().includes(this.qString.toLowerCase())
    );
    options.sort((a, b) => a.value.localeCompare(b.value));
    return options;
  }

  get errorBorder() {
    return this.formIsSubmitting && this.control.invalid
      ? 'ring-1 ring-red-500 dark:ring-red-400 border-none'
      : '';
  }

  constructor(public utils: UtilsService) {
    super();
  }

  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.selectedOption =
      this.options.find((option) => option.value === this.control.value) ??
      null;
    this.isRequired = this.control.hasValidator(Validators.required);
  }
  toggleDropdown() {
    this.qString = '';
    this.isDropdownOpen = !this.isDropdownOpen;
    this.checkDropdownPosition(this.dropdownContainer);
  }

  selectOption(option: OptionType) {
    this.selectedOption = option;
    this.isDropdownOpen = false;
    this.selectedValueChange.emit(option.value);
    this.control.setValue(option.value);
  }
}
