import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { UtilsService } from '../../services/utils.service';
import { NgIf } from '@angular/common';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'dashboard-select-dropdown',
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, NgIf, CapitalizePipe],
  templateUrl: './select-dropdown.component.html',
})
export class SelectDropdownComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) items!: Array<any>;
  @Input({ required: true }) formIsSubmitting!: boolean;
  @Input({ required: true }) bindLabel!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) bindValue!: string;

  @Input() label = '';
  @Input() class = '';
  @Input() isRequired = true;
  @Input() placeholder = '';
  @Input() notFoundText = 'No Items Found';
  @Input() clearable = false;
  @Input() appendTo = '';

  @Output() changeEvent = new EventEmitter();

  @ViewChild('ngSelect', { static: false }) ngSelect!: NgSelectComponent;
  control = new FormControl();

  windowScrollSubscription!: Subscription;

  constructor(public utils: UtilsService) {}
  ngOnInit(): void {
    this.control = this.formGroup.controls?.[this.name] as FormControl;
    this.control.value;

    this.windowScrollSubscription = fromEvent(window, 'scroll').subscribe(
      () => {
        this.ngSelect.close();
      }
    );
  }

  ngAfterViewChecked(): void {
    if (this.formIsSubmitting) {
      this.ngSelect.element.classList.add('error-on-submit');
    } else {
      this.ngSelect.element.classList.remove('error-on-submit');
    }
  }

  onChange(value: Event) {
    this.ngSelect.close();
    this.control.setErrors(null);
    this.changeEvent.emit(value);
  }

  ngOnDestroy(): void {
    this.windowScrollSubscription.unsubscribe()
  }
}
