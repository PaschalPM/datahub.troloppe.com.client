import { Location, NgIf } from '@angular/common';
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
  SECTORS_KEY,
  SUB_SECTORS_KEY,
  UNIQUE_CODES_KEY,
} from '@services/new-street-data-form.service';
import { StreetDataDetails } from 'app/shared/classes/street-data-details';
import { NotFoundComponent } from 'app/views/not-found/not-found.component';
import { constructionStatusOptions } from '../../../fixtures/street-data';
import { SubmitBtnComponent } from '@components/dashboard/submit-btn/submit-btn.component';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { ToastrService } from 'ngx-toastr';
import { BackBtnComponent } from '@components/back-btn/back-btn.component';

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
    BackBtnComponent,
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
      data['image_path'] = this.streetDataFormGroup.get('image_path')?.value;
      this.loader.start();
      this.streetDataService.edit(data, data.id).subscribe({
        next: () => {
          this.toastr.success('Street Data updated successfully.', 'Success');
          this.loader.stop();
        },
        error: (error) => {
          console.log(error)
          this.toastr.error(error.message, 'Error');
          this.loader.stop();
        },
      });
    },
  };

  uniqueCodeDataList!: Array<string>;
  formIsSubmitting = false;
  locationOptions: IdAndNameType[] = [];
  sectionOptions: IdAndNameType[] = [];
  sectorOptions: IdAndNameType[] = [];
  subSectorOptions: IdAndNameType[] = [];
  constructionStatusOptions: OptionType[] = constructionStatusOptions;
  isImageLoading = false;

  private allSections: SectionType[] = [];
  private allSubSectors: SubSectorType[] = [];
  private staticLocationId!: number;

  constructor(
    private modalService: ModalService,
    private fb: FormBuilder,
    private newStreetDataFormService: NewStreetDataFormService,
    private toastr: ToastrService,
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
        sector_id: [{ value: 0 }],
        sub_sector: ['', [Validators.required]],
        sub_sector_id: [{ value: 0 }],
        description: ['', [Validators.required]], // *
        section: ['', [Validators.required]],
        section_id: [null, [Validators.required]],

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
    this.onStreetDataFormValueChange();
  }

  onStreetDataFormValueChange() {
    this.streetDataFormGroup.valueChanges.subscribe((value) => {
      console.log('Hello')
      this.staticLocationId = value.location_id;
      this.sectionOptions = this.allSections.filter(
        (value) => value.location_id === this.staticLocationId
      );
      this.setSubSectorOptions(
        this.streetDataFormGroup.get('sector_id')?.value
      );
    });
  }

  onSectorChange(sector: IdAndNameType) {
    this.streetDataFormGroup.get('sector')?.setValue(sector.id);
    this.streetDataFormGroup.get('sector_id')?.setValue(sector.id);
    this.streetDataFormGroup.get('sub_sector')?.setValue(null);
    this.setSubSectorOptions(sector.id);
  }
  
  onSubSectorChange(subSector: IdAndNameType) {
    this.streetDataFormGroup.get('sub_sector')?.setValue(subSector.id);
    this.streetDataFormGroup.get('sub_sector_id')?.setValue(subSector.id);
  }
  
  onSectionChange(section: IdAndNameType) {
    this.streetDataFormGroup.controls['section_id']?.setValue(section.id);
    this.streetDataFormGroup.controls['section']?.setValue(section.id);
    console.log(this.streetDataFormGroup)
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
    } else {
      this.toastr.error(
        'Check that all fields are correctly filled.',
        'Form Error'
      );
    }
  }

  private setSubSectorOptions(sectorId: number) {
    this.subSectorOptions = this.allSubSectors.filter(
      (subSector) => subSector.sector_id === sectorId
    );

  }

  private getOptionsValueFromAPI() {
    this.newStreetDataFormService.observeAllResources().subscribe((event) => {
      this.staticLocationId =
        this.streetDataFormGroup.get('location_id')?.value;
      switch (event?.key) {
        case SECTIONS_KEY:
          this.allSections = event.value as SectionType[];
          break;
        case SECTORS_KEY:
          this.sectorOptions = (event.value as IdAndNameType[]).map(
            (sector) => ({
              ...sector,
              name: this.utils.capitalize(sector.name),
            })
          );
          break;
        case SUB_SECTORS_KEY:
          this.allSubSectors = event.value as SubSectorType[];
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
