import { FormGroup } from '@angular/forms';
import { StreetData } from '../types/street-data';
import { UserRoles } from '../enums/user-roles';
import { StreetDataService } from '@services/street-data.service';
import { ActivatedRoute } from '@angular/router';
import { PermissionService } from '@services/permission.service';
import { EventEmitter, inject } from '@angular/core';
import { UtilsService } from '@services/utils.service';
import { LoaderService } from '@services/loader.service';

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
  public utils = inject(UtilsService);
  public loader = inject(LoaderService);

  dataLoadedEvent = new EventEmitter();

  constructor() {}

  protected setStreetDataId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.streetDataId = +id;
    }
  }

  protected setFormDataAndSomeProperties() {
    this.loader.start();
    this.streetDataService.getStreetDataDetails(this.streetDataId).subscribe({
      next: (value) => {
        setTimeout(() => {
          this.streetData = value;
          this.streetData.unique_code = value.unique_code || 'New Entry';
          this.streetDataFormGroup.setValue(this.streetData);
          this.geolocation = value.geolocation;
          this.creator = value.creator;
          this.createdAt = this.utils.utcToFormattedDate(value.created_at);
        });
        this.dataIsLoaded = true;
        this.dataLoadedEvent.emit(this.dataIsLoaded);
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

  protected checkDataIsLoaded() {
    this.dataLoadedEvent.asObservable().subscribe((value) => {
      if (value) {
        this.loader.stop();
      }
    });
  }
}
