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
import {
  GeolocationService,
  PERMISSION_DENIED,
} from '../../../shared/services/geolocation.service';
import { ModalService } from '../../../shared/services/modal.service';
import { GeolocationAlertModalComponent } from '../../../shared/partials/modals/geolocation-alert-modal/geolocation-alert-modal.component';
import { SubmitBtnComponent } from '../../../shared/components/dashboard/submit-btn/submit-btn.component';
import { SelectDropdownComponent } from '../../../shared/components/select-dropdown/select-dropdown.component';
import { ActiveLocationIndicatorComponent } from '../../../shared/components/dashboard/active-location-indicator/active-location-indicator.component';
import {
  LOCATIONS_KEY,
  NewStreetDataFormService,
  SECTIONS_KEY,
  UNIQUE_CODES_KEY,
} from '../../../shared/services/new-street-data-form.service';

@Component({
  selector: 'app-new-street-data',
  standalone: true,
  imports: [
    ImageUploaderComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    SelectDropdownComponent,
    ActiveLocationIndicatorComponent,
  ],
  templateUrl: './new-street-data.component.html',
})
export class NewStreetDataComponent {
  formIsSubmitting = false;
  streetDataFormGroup!: FormGroup;
  selectedLocationValue!: number | null;
  isImageLoading = false;

  // ----->  Property Options From API
  locationOptions: IdAndNameType[] = [];
  uniqueCodeOptions: IdAndValueType[] = [];
  sectionOptions: IdAndNameType[] = [];
  private allSectors: SectionType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;



  constructor(
    private fb: FormBuilder,
    private newStreetDataFormService: NewStreetDataFormService,
    private geo: GeolocationService,
    private modalService: ModalService
  ) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: ['', [Validators.required]],
        location: ['', [Validators.required]],
        section: ['', [Validators.required]],
        number_of_units: [null, [Validators.required]], // *
        contact_name: [''],
        contact_numbers: [''],
        contact_email: ['', [Validators.email]],
        construction_status: ['', [Validators.required]],
        image: ['', [Validators.required]],

        geolocation: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.getOptionsValueFromAPI();

    // -----> Enable Geolocation Alert
    this.geo.errorEvents$.subscribe((error) => {
      if (error === PERMISSION_DENIED) {
        setTimeout(() => {
          this.modalService.open(GeolocationAlertModalComponent);
        }, 1000);
      }
    });
    this.geo.observe();

  }

  setSelectedLocationValue(data: IdAndNameType) {
    this.selectedLocationValue = null;
    this.streetDataFormGroup.get('section')?.setValue(null);
    setTimeout(() => {
      this.selectedLocationValue = data.id;
      this.sectionOptions = this.allSectors.filter((value) => value.location_id === data.id)
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

      // this.streetDataService.store(this.streetDataFormGroup.value).subscribe({
      //   next: (value) => {
      //     console.log(value);
      //   },
      // });
    } else {
      alert('Form is invalid');
    }
  }

  private getOptionsValueFromAPI() {
    this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      switch (event?.key) {
        case LOCATIONS_KEY:
          this.locationOptions = event.value as LocationType[];
          break;
        case SECTIONS_KEY:
          this.allSectors = event.value as SectionType[];
          break;
        case UNIQUE_CODES_KEY:
          this.uniqueCodeOptions = event.value as IdAndValueType[];
          break;
      }
    });
  }
}
