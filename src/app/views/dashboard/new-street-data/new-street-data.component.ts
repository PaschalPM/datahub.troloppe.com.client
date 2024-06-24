import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../shared/components/dashboard/input-field/input-field.component';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import {
  constructionStatusOptions,
  sectorOptions,
} from '../../../fixtures/street-data';
import { NewStreetDataFormService } from '../../../shared/services/new-street-data-form.service';
import { ImageUploaderComponent } from '../../../shared/components/image-uploader/image-uploader.component';

@Component({
  selector: 'app-new-street-data',
  standalone: true,
  imports: [ImageUploaderComponent, SelectDropdownComponent, InputFieldComponent, ReactiveFormsModule],
  templateUrl: './new-street-data.component.html',
})
export class NewStreetDataComponent {
  formIsSubmitting = false;
  streetDataFormGroup!: FormGroup;
  selectedLocationValue = '';
  isImageLoading = false

  private locationsWithSections!: (IdAndValueType & {
    sections: Array<IdAndValueType>;
  })[];

  // ----->  Property Options From API
  locationOptions: OptionType[] = [];
  uniqueCodeOptions: OptionType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;

  // -----> Getters Options
  get sectionOptions(): OptionType[] {
    const selectedSections = this.locationsWithSections.find(
      (value) => value.id === parseInt(this.selectedLocationValue)
    )?.sections;

    if (selectedSections) {
      return selectedSections.map((section) => ({
        value: section.id.toString(),
        label: section.value,
      }));
    }

    return [];
  }

  constructor(private fb: FormBuilder, private nsdf: NewStreetDataFormService) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        uniqueCode: ['', [Validators.required]],
        streetAddress: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: ['', [Validators.required]],
        location: ['', [Validators.required]],
        section: ['', [Validators.required]],
        numberOfUnits: [0, [Validators.required]], // *
        contactName: [''],
        contactNumbers: [''],
        contactEmail: ['', [Validators.email]],
        constructionStatus: ['', [Validators.required]],

        image: ['', [Validators.required]],
        isVerified: [null],
        creator: [],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.nsdf.getNewStreetDataFormValues().subscribe((data) => {
      this.locationsWithSections = data.locations;
      this.locationOptions = this.transformToOptionType(data, 'locations');
      this.uniqueCodeOptions = this.transformToOptionType(data, 'unique_codes');
    });
  }

  onSubmit() {
    this.formIsSubmitting = true;
  }

  setSelectedLocationValue(value: any) {
    this.selectedLocationValue = '';
    this.streetDataFormGroup.get('section')?.setValue(null);
    setTimeout(() => {
      this.selectedLocationValue = value;
    });
  }

  private transformToOptionType(data: NewStreetDataFormType, pptyKey: string) {
    const ppty = data[pptyKey as keyof NewStreetDataFormType];
    return ppty.map((v) => ({
      value: v.id.toString(),
      label: v.value,
    }));
  }
}
