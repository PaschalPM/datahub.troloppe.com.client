import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import { constructionStatusOptions } from '../../../fixtures/street-data';
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
import { UtilsService } from '@services/utils.service';
import { CreateStreetDataHelper } from 'app/shared/classes/create-street-data-helper';

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
export class NewStreetDataComponent extends CreateStreetDataHelper {
  formIsSubmitting = false;
  streetDataFormGroup!: FormGroup;
  isImageLoading = false;
  selectedSectorId = 0;

  // ----->  Property Options From API
  locationOptions: IdAndNameType[] = [];
  uniqueCodeOptions: IdAndValueType[] = [];
  sectionOptions: IdAndNameType[] = [];
  sectorOptions: IdAndNameType[] = [];
  subSectorOptions: IdAndNameType[] = [];

  private formFieldData!: StreetDataFormFieldDataInterface;
  private activeLocation!: LocationType;

  // -----> Property Options From Fixtures
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
    private sdffd: FormFieldDataService,
    private utils: UtilsService
  ) {
    super();
    // -----> Form Group
    this.streetDataFormGroup = this.fb.group(
      {
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        sector: [null, [Validators.required]],
        sub_sector: [null, [Validators.required]],
        location: [{ value: null, disabled: true }, [Validators.required]],
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
    this.getFormFieldDataAndSetOptionsValueFromAPI();
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

  // Get Street Data when Unique Code is changed
  getStreetData(optionValue: IdAndValueType) {
    if (optionValue) {
      if (optionValue.id) {
        this.loader.start();

        this.streetDataService
          .getStreetDataDetails(optionValue.id)
          .subscribe((streetData) => {
            // Get Selected Unique Code

            const selectedUniqueCode = this.formFieldData.unique_codes.find(
              (uniqueCode) =>
                uniqueCode.value.toLowerCase() ===
                streetData.unique_code.toLowerCase()
            );

            // Set selected sector ID to enable sub sector field to display
            this.selectedSectorId = streetData.sector_id;

            // Patch StreetDataForm with selected street data based on selected unique code
            this.streetDataFormGroup.patchValue({
              unique_code: selectedUniqueCode ? selectedUniqueCode.id : 0,
              street_address: streetData.street_address,
              description: streetData.description,
              sector: streetData.sector_id,
              sub_sector: streetData.sub_sector_id,
              location: this.activeLocation.id,
              section: streetData.section_id,
              number_of_units: streetData.number_of_units,
              contact_name: streetData.contact_name,
              contact_numbers: streetData.contact_numbers,
              contact_email: streetData.contact_email,
              construction_status: streetData.construction_status,
              image: streetData.image_path,
              geolocation: streetData.geolocation,
            });

            // Setup Sub Sector Options based on selected sector ID
            this.setSubSectorOptions();
          });
      }
    }
  }

  onCreate(createAnother = false) {
    this.formIsSubmitting = true;
    if (this.streetDataFormGroup.valid) {
      this.modalService.open(ConfirmModalComponent, {
        matIconName: 'description',
        title: 'Confirm Data Submission',
        message: 'Proceed if you are sure this form was correctly filled.',
        severity: 'warning',
        ok: async () => {
          this.loader.start();
          const body = this.formatedDataForSubmission(
            this.streetDataFormGroup,
            this.uniqueCodeOptions
          );

          let googleMapsUrl;
          try {
            googleMapsUrl = await this.geo.getGoogleMapsUrl();
          } catch (error) {
            googleMapsUrl = null;
          }

          body.geolocation = googleMapsUrl;
          this.streetDataService.store(body).subscribe({
            next: (streetData) => {
              this.formIsSubmitting = false;
              this.toaster.success(
                'Street Data successfully saved.',
                'Success'
              );
              if (createAnother) {
                this.streetDataFormGroup.reset();
                this.streetDataFormGroup.patchValue({
                  location: this.activeLocation.id,
                });
              } else {
                this.router.navigateByUrl(
                  `/dashboard/street-data/${streetData.id}`
                );
              }
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

  onSectorChange(selectedSector: IdAndNameType) {
    this.selectedSectorId = selectedSector.id;
    this.streetDataFormGroup.get('sub_sector')?.setValue(null);
    this.setSubSectorOptions();
  }

  // Set Location Options
  private setLocationOptions() {
    this.locationOptions = this.formFieldData.locations.map((location) => ({
      id: location.id,
      name: location.name,
    }));
  }

  // Set Section Options based on active location
  private setSectionOptions() {
    this.sectionOptions = this.formFieldData.locations.find(
      (location) => location.id === this.activeLocation.id
    )?.sections as IdAndNameType[];
  }

  // Set Sector Options
  private setSectorOptions() {
    this.sectorOptions = this.formFieldData.sectors.map(({ id, name }) => ({
      id,
      name: this.utils.capitalize(name),
    }));
  }

  // Set Sector Options
  private setSubSectorOptions() {
    const selectedSector = this.formFieldData.sectors.find(
      (sector) => sector.id === this.selectedSectorId
    );
    if (selectedSector) {
      this.subSectorOptions = selectedSector.sub_sectors;
    }
  }

  // Set Unique Code Options
  private setUniqueCodeOptions() {
    this.uniqueCodeOptions = this.formFieldData.unique_codes.filter(
      (value) => value.location_id === this.activeLocation.id || value.id === 0
    );
  }

  private getFormFieldDataAndSetOptionsValueFromAPI() {
    // Retrieve Active Location First
    this.activeLocationService
      .getActiveLocation()
      .subscribe((activeLocation) => {
        if (activeLocation) this.activeLocation = activeLocation;

        this.sdffd.getFormFieldData().subscribe((formFieldData) => {
          if (formFieldData) {
            // Set FormFieldData
            this.formFieldData = formFieldData;
            this.setLocationOptions();
            this.setSectionOptions();
            this.setSectorOptions();
            this.setUniqueCodeOptions();
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
    }
  }
}
