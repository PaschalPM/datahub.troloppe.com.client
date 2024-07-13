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
import { StreetDataService } from '@services/street-data.service';
import { LoaderService } from '@services/loader.service';
import { ActiveLocationService } from '@services/active-location.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from '@partials/modals/confirm-modal/confirm-modal.component';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { Router } from '@angular/router';
import { BackBtnComponent } from '@components/back-btn/back-btn.component';
import { FormFieldDataService } from '@services/street-data/form-field-data.service';

@Component({
  selector: 'app-new-street-data',
  standalone: true,
  imports: [
    ImageUploaderComponent,
    InputFieldComponent,
    ReactiveFormsModule,
    SubmitBtnComponent,
    SelectDropdownComponent,
    TextButtonComponent,
    BackBtnComponent,
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
  sectionOptions: SectionType[] = [];

  private activeLocation!: LocationType;
  private allSections: SectionType[] = [];
  private allUniqueCodes: UniqueCodeType[] = [];

  // -----> Property Options From Fixtures
  sectorOptions: OptionType[] = sectorOptions;
  constructionStatusOptions: OptionType[] = constructionStatusOptions;

  constructor(
    private fb: FormBuilder,
    private geo: GeolocationService,
    private modalService: ModalService,
    private streetDataService: StreetDataService,
    private loader: LoaderService,
    private activeLocationService: ActiveLocationService,
    private toaster: ToastrService,
    private router: Router,
    private sdffd: FormFieldDataService
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
        number_of_units: [null, [Validators.required, Validators.max(1000)]], // *
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
    this.setKeyFieldsFromGetActiveLocation();

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

  goBack() {
    this.router.navigateByUrl('/dashboard/street-data');
  }
  getStreetData(optionValue: IdAndValueType) {
    console.log(this.allUniqueCodes, optionValue);
    if (optionValue) {
      if (optionValue.id) {
        this.loader.start();
        this.streetDataService
          .getStreetDataDetails(optionValue.id)
          .subscribe((streetData) => {
            const selectedUniqueCode = this.allUniqueCodes.find(
              (uniqueCode) =>
                uniqueCode.value.toLowerCase() ===
                streetData.unique_code.toLowerCase()
            );
            const selectedSection = this.allSections.find(
              (value) => value.location_id === this.activeLocation.id
            );

            this.streetDataFormGroup.setValue({
              unique_code: selectedUniqueCode ? selectedUniqueCode.id : null, // Take Note
              street_address: streetData.street_address,
              description: streetData.description,
              sector: streetData.sector,
              location: this.activeLocation.id,
              section: selectedSection ? selectedSection.id : null,
              number_of_units: streetData.number_of_units,
              contact_name: streetData.contact_name,
              contact_numbers: streetData.contact_numbers,
              contact_email: streetData.contact_email,
              construction_status: streetData.construction_status,
              image: streetData.image_path,
              geolocation: streetData.geolocation,
            });
          });
      }
    }
  }

  async onSubmit() {
    this.formIsSubmitting = true;

    if (this.streetDataFormGroup.valid) {
      const body = this.streetDataFormGroup.value;
      const uniqueCodeStreetDataId = this.streetDataFormGroup.value.unique_code;
      body.unique_code = this.allUniqueCodes.find(
        (uniqueCode) => uniqueCode.id === uniqueCodeStreetDataId
      )?.value;
      body.location = this.streetDataFormGroup.controls['location'].value;
      body.geolocation = encodeURIComponent(
        this.streetDataFormGroup.controls['geolocation'].value
      );

      if (body.unique_code === 'New Entry') {
        body.unique_code = null;
      }
      let googleMapsUrlOrErrorMsg;
      try {
        googleMapsUrlOrErrorMsg = await this.geo.getGoogleMapsUrl();
      } catch (error) {
        googleMapsUrlOrErrorMsg = error;
      }

      this.streetDataFormGroup.controls['geolocation'].setValue(
        googleMapsUrlOrErrorMsg
      );
      this.modalService.open(ConfirmModalComponent, {
        matIconName: 'description',
        title: 'Confirm Data Submission',
        message: 'Proceed if you are sure this form was correctly filled.',
        severity: 'warning',
        ok: () => {
          this.loader.start();
          this.streetDataService.store(body).subscribe({
            next: (streetData) => {
              this.streetDataFormGroup.reset();
              this.formIsSubmitting = false;
              this.toaster.success(
                'Street Data successfully saved.',
                'Success'
              );
              this.router.navigateByUrl(
                `/dashboard/street-data/${streetData.id}`
              );
            },
          });
        },
      });
    } else {
      this.toaster.error(
        'Check that all fields are correctly filled.',
        'Form Error'
      );
    }
  }

  private getOptionsValueFromAPI() {
    // Retrieve Active Location First
    this.activeLocationService
      .getActiveLocation()
      .subscribe((activeLocation) => {
        if (activeLocation) this.activeLocation = activeLocation;

        this.sdffd.getFormFieldData().subscribe((formFieldData) => {
          if (formFieldData) {
            // Set Location Options
            this.locationOptions = formFieldData.locations.map((location) => ({
              id: location.id,
              name: location.name,
            }));

            // Set Section Options based on active location
            this.sectionOptions = formFieldData.locations.find(
              (location) => location.id === this.activeLocation.id
            )?.sections as SectionType[];

            // Set Unique Code Options
            this.uniqueCodeOptions = formFieldData.unique_codes.filter(
              (value) => value.location_id === this.activeLocation.id
            );
          }
        });
      });
  }

  /**
   * Sets the values for Location, Section and UniqueCode fields
   */
  private setKeyFieldsFromGetActiveLocation() {
    if (this.activeLocation) {
      this.streetDataFormGroup.controls['location'].setValue(
        this.activeLocation.id
      );
      this.setUniqueCodeAndSections(this.activeLocation.id as number);
    }
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
