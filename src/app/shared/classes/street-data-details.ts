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

  public utils = inject(UtilsService);
  protected streetDataService = inject(StreetDataService);
  protected loader = inject(LoaderService);
  private permissionService = inject(PermissionService);
  private activatedRoute = inject(ActivatedRoute);

  dataLoadedEvent = new EventEmitter();

  constructor() {}

  protected setStreetDataId() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.streetDataId = +id;
    }
  }

  protected setFormDataAndSomeProperties(forEditForm: boolean = false) {
    this.loader.start();
    this.streetDataService.getStreetDataDetails(this.streetDataId).subscribe({
      next: (value) => {
        setTimeout(() => {
          if (forEditForm) {
            const newValue = {...value}
            newValue.section = value.section_id as any;
            this.streetData = newValue;
          } else {
            const newValue = {...value}
            newValue.sector = this.utils.capitalize(value.sector)
            this.streetData = newValue;
          }
          this.streetData.unique_code = value.unique_code || 'New Entry';
          this.streetDataFormGroup.setValue(this.streetData);
          this.geolocation = decodeURIComponent(value.geolocation);
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
