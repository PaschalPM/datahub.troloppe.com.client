import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { SelectDropdownComponent } from '@components/select-dropdown/select-dropdown.component';
import { ConfirmModalComponent } from '@partials/modals/confirm-modal/confirm-modal.component';
import { ModalService } from '@services/modal.service';
import {
  NewStreetDataFormService,
  SECTIONS_KEY,
  UNIQUE_CODES_KEY,
} from '@services/new-street-data-form.service';
import { StreetDataDetails } from 'app/shared/classes/street-data-details';
import { NotFoundComponent } from 'app/views/not-found/not-found.component';
import {
  constructionStatusOptions,
  sectorOptions,
} from '../../../fixtures/street-data';
import { SubmitBtnComponent } from '@components/dashboard/submit-btn/submit-btn.component';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-street-data',
  standalone: true,
  imports: [
    TextButtonComponent,
    NotFoundComponent,
    ReactiveFormsModule,
    NgIf,
    ImageUploaderComponent,
    InputFieldComponent,
    SelectDropdownComponent,
    SubmitBtnComponent,
    MyMatIconComponent,
  ],
  templateUrl: './edit-street-data.component.html',
})
export class EditStreetDataComponent extends StreetDataDetails {
  confirmDeleteModalPropsData: ConfirmModalPropsType = {
    matIconName: 'delete',
    title: 'Confirm Delete',
    message: 'Are you sure you want to delete this street data record?',
    ok: () => {
      this.loader.start();
      this.streetDataService.delete(this.streetData.id as number).subscribe({
        next: () => {
          this.toastr.success('Street Data deleted successfully.', 'Success');
          this.loader.stop();
        },
        error: (error) => {
          this.toastr.error(error.message, 'Error');
          this.loader.stop();
        },
      });
    },
  };

  confirmEditModalPropsData: ConfirmModalPropsType = {
    matIconName: 'edit',
    title: 'Confirm Edit',
    message: 'Are you sure you want to edit this street data record?',
    ok: () => {
      const data = { ...this.streetDataFormGroup.value };

      data['location'] = this.streetDataFormGroup.get('location_id')?.value;
      data['image'] = this.streetDataFormGroup.get('image_path')?.value;

      this.loader.start();
      this.streetDataService.edit(data, data.id).subscribe({
        next: () => {
          this.toastr.success('Street Data updated successfully.', 'Success');
          this.loader.stop();
        },
        error: (error) => {
          this.toastr.error(error.message, 'Error');
          this.loader.stop();
        },
      });
    },
  };

  uniqueCodeDataList!: Array<string>;
  formIsSubmitting = false;
  sectorOptions = sectorOptions;
  locationOptions: IdAndNameType[] = [];
  sectionOptions: IdAndNameType[] = [];
  constructionStatusOptions: OptionType[] = constructionStatusOptions;
  isImageLoading = false;

  private allSections: SectionType[] = [];
  private staticLocationId!: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private newStreetDataFormService: NewStreetDataFormService,
    private toastr: ToastrService
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
          [Validators.required],
        ],
        unique_code: ['', [Validators.required]],
        street_address: ['', [Validators.required]],
        location: [{ value: '', disabled: true }, [Validators.required]],
        location_id: [{ value: 0 }],
        sector: ['', [Validators.required]],
        description: ['', [Validators.required]], // *
        section: ['', [Validators.required]],
        section_id: [{ value: 0 }],

        number_of_units: [null, [Validators.required, Validators.max(1000)]], // *
        contact_name: [''],
        contact_numbers: [''],
        contact_email: ['', [Validators.email]],
        construction_status: ['', [Validators.required]],
        is_verified: [false],
        geolocation: [''],
        creator: [''],
        created_at: [''],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.setStreetDataId();
    this.setFormDataAndSomeProperties(true);
    this.setPermission();
    this.getUniqueCodeDataList();
    this.checkDataIsLoaded();
    this.getOptionsValueFromAPI();

    this.streetDataFormGroup.valueChanges.subscribe((value) => {
      this.staticLocationId = value.location_id;
      this.sectionOptions = this.allSections.filter(
        (value) => value.location_id === this.staticLocationId
      );
    });
  }

  onDeleteStreetData() {
    this.modalService.open(
      ConfirmModalComponent,
      this.confirmDeleteModalPropsData
    );
  }

  getUniqueCodeDataList() {
    this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      if (event?.key === UNIQUE_CODES_KEY) {
        this.uniqueCodeDataList = (event.value as IdAndValueType[]).map(
          (uniqueCode) => {
            return uniqueCode.value;
          }
        );
      }
    });
  }

  onEditStreetData() {
    this.formIsSubmitting = true;
    if (this.streetDataFormGroup.valid) {
      this.modalService.open(
        ConfirmModalComponent,
        this.confirmEditModalPropsData
      );
    }
  }

  private getOptionsValueFromAPI() {
    this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      this.staticLocationId =
        this.streetDataFormGroup.get('location_id')?.value;
      switch (event?.key) {
        case SECTIONS_KEY:
          this.allSections = event.value as SectionType[];
          break;
        case UNIQUE_CODES_KEY:
          this.uniqueCodeDataList = (event.value as IdAndValueType[]).map(
            (uniqueCode) => {
              return uniqueCode.value;
            }
          );
          break;
      }
      this.setSections(this.staticLocationId);
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
