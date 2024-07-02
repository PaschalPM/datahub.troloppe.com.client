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
import { StreetDataService } from '@services/street-data.service';
import { LoaderService } from '@services/loader.service';
import { ActiveLocationService } from '@services/active-location.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  isImageLoading = false;

  // ----->  Property Options From API
  locationOptions: IdAndNameType[] = [];
  uniqueCodeOptions: IdAndValueType[] = [];
  sectionOptions: IdAndNameType[] = [];

  private staticLocationId!: number;
  private allSections: SectionType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;

  constructor(
    private fb: FormBuilder,
    private newStreetDataFormService: NewStreetDataFormService,
    private geo: GeolocationService,
    private modalService: ModalService,
    private streetDataService: StreetDataService,
    private loader: LoaderService,
    private activeLocationService: ActiveLocationService,
    private toaster: ToastrService
  ) {
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: ['', [Validators.required]],
        location: [{ value: '', disabled: true }, [Validators.required]],
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
    this.getActiveLocationAndSetSection();

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
    this.streetDataFormGroup.get('section')?.setValue(null);
    setTimeout(() => {
      this.sectionOptions = this.allSections.filter(
        (value) => value.location_id === data.id
      );
    });
  }

  getStreetData(optionValue: IdAndValueType) {
    if (optionValue) {
      if (optionValue.id) {
        this.loader.start();
        this.streetDataService
          .getStreetDataDetails(optionValue.id)
          .subscribe((streetData) => {
            const selectedUniqueCode = this.uniqueCodeOptions.find(
              (uniqueCode) =>
                uniqueCode.value.toLowerCase() ===
                streetData.unique_code.toLowerCase()
            );
            const selectedSection = this.allSections.find(
              (value) => value.location_id === this.staticLocationId
            );

            this.streetDataFormGroup.setValue({
              unique_code: selectedUniqueCode ? selectedUniqueCode.id : null, // Take Note
              street_address: streetData.street_address,
              description: streetData.description,
              sector: streetData.sector,
              location: this.staticLocationId,
              section: selectedSection ? selectedSection.id : null,
              number_of_units: streetData.number_of_units,
              contact_name: streetData.contact_name,
              contact_numbers: streetData.contact_numbers,
              contact_email: streetData.contact_email,
              construction_status: streetData.construction_status,
              image: '',
              geolocation: streetData.geolocation,
            });
            this.setSections(this.staticLocationId);
            this.loader.stop();
          });
      }
    } else {
      this.streetDataFormGroup.reset();
    }
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
      this.toaster.error(
        'Check that all fields are correctly filled.',
        'Form Error'
      );
    }
  }

  private getOptionsValueFromAPI() {
    this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      switch (event?.key) {
        case LOCATIONS_KEY:
          this.locationOptions = event.value as LocationType[];
          break;
        case SECTIONS_KEY:
          this.allSections = event.value as SectionType[];
          break;
        case UNIQUE_CODES_KEY:
          this.uniqueCodeOptions = event.value as IdAndValueType[];
          break;
      }
    });
  }

  private getActiveLocationAndSetSection() {
    this.activeLocationService.activeLocation().subscribe((activeLocation) => {
      this.staticLocationId = activeLocation?.id as number;
      this.streetDataFormGroup.controls['location'].setValue(
        activeLocation?.id
      );
      this.setSections(activeLocation?.id as number);
    });
  }

  private setSections(staticLocationId: number) {
    setTimeout(() => {
      this.sectionOptions = this.allSections.filter(
        (value) => value.location_id === staticLocationId
      );
    });
  }
}
