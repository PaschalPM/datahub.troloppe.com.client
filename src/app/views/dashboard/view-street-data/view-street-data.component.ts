import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import { InputFieldComponent } from '@components/dashboard/input-field/input-field.component';
import { ImageUploaderComponent } from '@components/image-uploader/image-uploader.component';
import { PermissionService } from '@services/permission.service';
import { StreetDataService } from '@services/street-data.service';
import { UtilsService } from '@services/utils.service';
import { UserRoles } from 'app/shared/enums/user-roles';
import { StreetData } from 'app/shared/types/street-data';

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
  ],
  templateUrl: './view-street-data.component.html',
})
export class ViewStreetDataComponent {
  streetDataFormGroup!: FormGroup;
  isPermitted = false;
  streetData!: StreetData;
  geolocation = '';
  creator = '';
  createdAt = '';
  dataIsLoaded = false;

  private streetDataId!: number;

  constructor(
    public utils: UtilsService,
    private fb: FormBuilder,
    private permissionService: PermissionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private streetDataService: StreetDataService
  ) {
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

  private setStreetDataId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.streetDataId = +id;
    }
  }

  private setFormDataAndSomeProperties() {
    this.streetDataService
      .getStreetDataDetails(this.streetDataId)
      .subscribe((value) => {
        this.streetData = value;
        this.streetDataFormGroup.setValue(value);
        this.geolocation = value.geolocation;
        this.creator = value.creator;
        this.createdAt = value.created_at;
        this.dataIsLoaded = true;
      });
  }

  private setPermission() {
    this.isPermitted = this.permissionService.isPermitted([
      UserRoles.Admin,
      UserRoles.ResearchManager,
    ]);
  }
}
