import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { SelectDropdownComponent } from '@components/select-dropdown/select-dropdown.component';
import { ConfirmModalComponent } from '@partials/modals/confirm-modal/confirm-modal.component';
import { ModalService } from '@services/modal.service';
import {
  NewStreetDataFormService,
  UNIQUE_CODES_KEY,
} from '@services/new-street-data-form.service';
import { StreetDataDetails } from 'app/shared/classes/street-data-details';
import { NotFoundComponent } from 'app/views/not-found/not-found.component';
import {
  constructionStatusOptions,
  sectorOptions,
} from '../../../fixtures/street-data';

@Component({
  selector: 'app-edit-street-data',
  standalone: true,
  imports: [
    ActiveLocationIndicatorComponent,
    TextButtonComponent,
    NotFoundComponent,
    ReactiveFormsModule,
    NgIf,
    ImageUploaderComponent,
    InputFieldComponent,
    SelectDropdownComponent,
  ],
  templateUrl: './edit-street-data.component.html',
})
export class EditStreetDataComponent extends StreetDataDetails {
  confirmModalPropsData: ConfirmModalPropsType = {
    matIconName: 'delete',
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this street data record?',
    ok() {
      alert('Hello World');
    },
  };
  uniqueCodeDataList!: Array<string>;
  formIsSubmitting = false;
  sectorOptions = sectorOptions
  
  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private nsdfs: NewStreetDataFormService
  ) {
    super();
    this.streetDataFormGroup = this.fb.group(
      {
        id: [''],
        image_path: [
          {
            value: '',
            disabled: true,
          },
        ],
        unique_code: [''],
        street_address: [''],
        sector: [''],
        location: [''],
        section: [''],
        number_of_units: [''], // *
        contact_name: [''],
        contact_numbers: [''],
        contact_email: [''],
        construction_status: [''],
        is_verified: [false],
        description: [''],
        geolocation: [''],
        creator: [''],
        created_at: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.setStreetDataId();
    this.setFormDataAndSomeProperties();
    this.setPermission();
    this.getUniqueCodeDataList();
    this.checkDataIsLoaded();
  }

  onDeleteStreetData() {
    this.modalService.open(ConfirmModalComponent, this.confirmModalPropsData);
  }

  getUniqueCodeDataList() {
    this.nsdfs.observeAllResources().subscribe((event) => {
      if (event?.key === UNIQUE_CODES_KEY) {
        this.uniqueCodeDataList = (event.value as IdAndValueType[]).map(
          (uniqueCode) => {
            return uniqueCode.value;
          }
        );
      }
    });
  }
}
