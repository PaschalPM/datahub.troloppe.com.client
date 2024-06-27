import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StreetDataService } from '../../../services/street-data.service';
import { SelectDropdownComponent } from '../../../components/select-dropdown/select-dropdown.component';

@Component({
  selector: 'app-active-location-form-modal',
  standalone: true,
  imports: [SelectDropdownComponent],
  template: `
    <div class="prose min-h-36 relative">
      <h3 class="dark:text-white">Set Active Location</h3>
      <!-- <app-seelect-dropdown
        name="location"
        [formGroup]="activeLocationFormGroup"
        [items]="cars"
        bindLabel="name"
        bindValue="id"
        [formIsSubmitting]="formIsSubmitting"
      ></app-seelect-dropdown> -->

    </div>
  `,
  styles: `
  .cdk-overlay-transparent-backdrop{
    background-color:red
  }
  `,
})
export class ActiveLocationFormModalComponent {
  activeLocationFormGroup!: FormGroup;
  formIsSubmitting = false;
  locationOptions: OptionType[] = [];

  cars = [
    { id: 1, name: 'Volvo' },
    { id: 2, name: 'Saab' },
    { id: 3, name: 'Opel' },
    { id: 4, name: 'Audi' },
    { id: 4, name: 'Audi' },
    { id: 4, name: 'Audi' },
    { id: 4, name: 'Audi' },
    { id: 4, name: 'Audi' },
    { id: 4, name: 'Audi' },
  ];
  constructor(
    private fb: FormBuilder,
    private streetDataService: StreetDataService
  ) {
    this.activeLocationFormGroup = this.fb.group({
      location: [''],
    });
  }

  ngOnInit(): void {
    const activeLocation = this.streetDataService.activeLocation;
    this.activeLocationFormGroup.controls['location'].setValue(activeLocation);
  }

  private transformToOptionType(data: NewStreetDataFormType, pptyKey: string) {
    const ppty = data[pptyKey as keyof NewStreetDataFormType];
    return ppty.map((v) => ({
      value: v.id.toString(),
      label: v.value,
    }));
  }
}
