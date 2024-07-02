import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { UtilsService } from '@services/utils.service';
import { StreetDataDetails } from 'app/shared/classes/street-data-details';

import { NotFoundComponent } from 'app/views/not-found/not-found.component';

@Component({
  selector: 'app-view-street-data',
  standalone: true,
  imports: [
    ActiveLocationIndicatorComponent,
    ReactiveFormsModule,
    ImageUploaderComponent,
    InputFieldComponent,
    TextButtonComponent,
    NgIf,
    MyMatIconComponent,
    NotFoundComponent,
  ],
  templateUrl: './view-street-data.component.html',
})
export class ViewStreetDataComponent extends StreetDataDetails {
  constructor(
    public utils: UtilsService,
    private fb: FormBuilder,
    private router: Router
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
        unique_code: [
          {
            value: '',
            disabled: true,
          },
        ],
        street_address: [
          {
            value: '',
            disabled: true,
          },
        ],
        sector: [
          {
            value: '',
            disabled: true,
          },
        ],
        location: [
          {
            value: '',
            disabled: true,
          },
        ],
        section: [{ value: '', disabled: true }],
        number_of_units: [{ value: '', disabled: true }], // *
        contact_name: [{ value: '', disabled: true }],
        contact_numbers: [{ value: '', disabled: true }],
        contact_email: [{ value: '', disabled: true }],
        construction_status: [{ value: '', disabled: true }],
        is_verified: [{ value: true, disabled: true }],
        description: [{ value: '', disabled: true }],
        geolocation: [{ value: '', disabled: true }],
        creator: [{ value: '', disabled: true }],
        created_at: [{ value: '', disabled: true }],
      },
      { updateOn: 'submit' }
    );
  }

  ngOnInit(): void {
    this.setStreetDataId();
    this.setFormDataAndSomeProperties();
    this.setPermission();
  }

  routeToEditStreetView() {
    this.router.navigateByUrl(
      `/dashboard/street-data/edit/${this.streetDataId}`
    );
  }
}
