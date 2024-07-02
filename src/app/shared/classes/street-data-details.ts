import { FormGroup } from '@angular/forms';
import { StreetData } from '../types/street-data';
import { UserRoles } from '../enums/user-roles';
import { StreetDataService } from '@services/street-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '@services/permission.service';
import { inject } from '@angular/core';

export class StreetDataDetails {
  streetDataFormGroup!: FormGroup;
  isPermitted = false;
  streetData!: StreetData;
  geolocation = '';
  creator = '';
  createdAt = '';
  dataIsLoaded = false;
  dataNotFound = false;

  protected streetDataId!: number;

  private permissionService = inject(PermissionService);
  private activatedRoute = inject(ActivatedRoute);
  private streetDataService = inject(StreetDataService);
  constructor() {}

  protected setStreetDataId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.streetDataId = +id;
    }
  }

  protected setFormDataAndSomeProperties() {
    this.streetDataService.getStreetDataDetails(this.streetDataId).subscribe({
      next: (value) => {
        setTimeout(() => {
          this.streetData = value;
          this.streetDataFormGroup.setValue(value);
          this.geolocation = value.geolocation;
          this.creator = value.creator;
          this.createdAt = value.created_at;
        });
        this.dataIsLoaded = true;
      },
      error: (error) => {
        if (error.status === 404) {
          this.dataNotFound = true;
        }
      },
    });
  }

  protected setPermission() {
    this.isPermitted = this.permissionService.isPermitted([
      UserRoles.Admin,
      UserRoles.ResearchManager,
    ]);
  }
}
