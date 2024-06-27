import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '../../../shared/components/dashboard/input-field/input-field.component';
import {
  constructionStatusOptions,
  sectorOptions,
} from '../../../fixtures/street-data';
import { ImageUploaderComponent } from '../../../shared/components/image-uploader/image-uploader.component';
import { StreetDataService } from '../../../shared/services/street-data.service';
import {
  GeolocationService,
  PERMISSION_DENIED,
} from '../../../shared/services/geolocation.service';
import { ModalService } from '../../../shared/services/modal.service';
import { GeolocationAlertModalComponent } from '../../../shared/partials/modals/geolocation-alert-modal/geolocation-alert-modal.component';
import { SubmitBtnComponent } from '../../../shared/components/dashboard/submit-btn/submit-btn.component';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { UtilsService } from '../../../shared/services/utils.service';
import { ActiveLocationIndicatorComponent } from '../../../shared/components/dashboard/active-location-indicator/active-location-indicator.component';

@Component({
  selector: 'app-new-street-data',
  standalone: true,
  imports: [
    ImageUploaderComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    SelectDropdownComponent,
    ActiveLocationIndicatorComponent
  ],
  templateUrl: './new-street-data.component.html',
})
export class NewStreetDataComponent {
  formIsSubmitting = false;
  streetDataFormGroup!: FormGroup;
  selectedLocationValue!: number | null;
  isImageLoading = false;

  private locationsWithSections!: (IdAndValueType & {
    sections: Array<IdAndValueType>;
  })[];

  // ----->  Property Options From API
  locationOptions: IdAndValueType[] = [];
  uniqueCodeOptions: IdAndValueType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;

  // -----> Getters Options
  get sectionOptions(): IdAndValueType[] {
    const selectedSections = this.locationsWithSections.find(
      (value) => value.id === this.selectedLocationValue
    )?.sections;

    if (selectedSections)
      return selectedSections

    return [];
  }

  constructor(
    private fb: FormBuilder,
    private streetDataService: StreetDataService,
    private geo: GeolocationService,
    private modalService: ModalService,
    private utils: UtilsService
  ) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        uniqueCode: ['', [Validators.required]],
        streetAddress: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: ['', [Validators.required]],
        location: ['', [Validators.required]],
        section: ['', [Validators.required]],
        numberOfUnits: [null, [Validators.required]], // *
        contactName: [''],
        contactNumbers: [''],
        contactEmail: ['', [Validators.email]],
        constructionStatus: ['', [Validators.required]],
        image: ['', [Validators.required]],

        geolocation: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    // -----> Enable Geolocation Alert
    this.geo.errorEvents$.subscribe((error) => {
      if (error === PERMISSION_DENIED) {
        setTimeout(() => {

          this.modalService.open(GeolocationAlertModalComponent);
        }, 1000)
      }
    });
    this.geo.observe();

    // -----> Load Street Data For the Form
    this.streetDataService.getNewStreetDataFormValues().subscribe((data) => {
      this.locationsWithSections = data.locations;
      this.locationOptions = this.capitalizeOptionLabel(data.locations)
      this.uniqueCodeOptions = data.unique_codes
    });
  }

  setSelectedLocationValue(data: IdAndValueType) {
    this.selectedLocationValue = null;
    this.streetDataFormGroup.get('section')?.setValue(null);
    setTimeout(() => {
      this.selectedLocationValue = data.id;
    });
  }

  async onSubmit() {
    this.formIsSubmitting = true;

    if (this.streetDataFormGroup.valid) {
      let googleMapsUrlOrErrorMsg;

      try {
        googleMapsUrlOrErrorMsg = await this.geo.getGoogleMapsUrl();
      } catch (error) {
        googleMapsUrlOrErrorMsg = error;
      }

      this.streetDataFormGroup.controls['geolocation'].setValue(
        googleMapsUrlOrErrorMsg
      );

      this.streetDataService.store(this.streetDataFormGroup.value).subscribe({
        next: (value) => {
          console.log(value);
        },
      });
    } else {
      alert('Form is invalid');
    }
  }

  private capitalizeOptionLabel(data: IdAndValueType[]){
    return data.map(({id, value}) => ({id, value: this.utils.capitalize(value, true)}))
  }
}
