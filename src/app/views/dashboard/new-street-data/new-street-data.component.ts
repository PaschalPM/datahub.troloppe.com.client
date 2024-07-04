import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import {
  constructionStatusOptions,
  sectorOptions,
} from '../../../fixtures/street-data';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import {
  GeolocationService,
  PERMISSION_DENIED,
} from '@services/geolocation.service';
import { ModalService } from '@services/modal.service';
import { GeolocationAlertModalComponent } from '@partials/modals/geolocation-alert-modal/geolocation-alert-modal.component';
import { SubmitBtnComponent } from '@components/dashboard/submit-btn/submit-btn.component';
import { SelectDropdownComponent } from '@components/select-dropdown/select-dropdown.component';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import {
  LOCATIONS_KEY,
  NewStreetDataFormService,
  SECTIONS_KEY,
  UNIQUE_CODES_KEY,
} from '@services/new-street-data-form.service';
import { StreetDataService } from '@services/street-data.service';
import { LoaderService } from '@services/loader.service';
import { ActiveLocationService } from '@services/active-location.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';

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
  private allUniqueCodes: UniqueCodeType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;

  private observeAllSDRSubscription!: Subscription

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
    this.setKeyFieldsFromActiveLocation();

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
    console.log(optionValue)
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
            this.setUniqueCodeAndSections(this.staticLocationId);
            this.loader.stop();
          });
      }
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

  ngOnDestroy(): void {
    this.observeAllSDRSubscription.unsubscribe()
  }

  private getOptionsValueFromAPI() {
    this.observeAllSDRSubscription = this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      switch (event?.key) {
        case LOCATIONS_KEY:
          this.locationOptions = event.value as LocationType[];
          break;
        case SECTIONS_KEY:
          this.allSections = event.value as SectionType[];
          break;
        case UNIQUE_CODES_KEY:
          this.allUniqueCodes = event.value as UniqueCodeType[];
          break;
      }
    });
  }

  /**
   * Sets the values for Location, Section and UniqueCode fields
   */
  private setKeyFieldsFromActiveLocation() {
    this.activeLocationService.activeLocation().subscribe((activeLocation) => {
      this.staticLocationId = activeLocation?.id as number;
      this.streetDataFormGroup.controls['location'].setValue(
        activeLocation?.id
      );
      this.setUniqueCodeAndSections(activeLocation?.id as number);
    });
  }

  private setUniqueCodeAndSections(staticLocationId: number) {
    setTimeout(() => {
      
      this.uniqueCodeOptions = this.allUniqueCodes.filter(
        (value) => value.location_id === staticLocationId || !value.location_id
      );

      this.sectionOptions = this.allSections.filter(
        (value) => value.location_id === staticLocationId
      );
    });
  }
}
