import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import { ConfirmModalComponent } from '@partials/modals/confirm-modal/confirm-modal.component';
import { ModalService } from '@services/modal.service';
import { StreetDataService } from '@services/street-data.service';
import { StreetDataDetails } from 'app/shared/classes/street-data-details';
import { StreetData } from 'app/shared/types/street-data';
import { NotFoundComponent } from 'app/views/not-found/not-found.component';

@Component({
  selector: 'app-edit-street-data',
  standalone: true,
  imports: [
    ActiveLocationIndicatorComponent,
    TextButtonComponent,
    NotFoundComponent,
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

  constructor(private modalService: ModalService, private fb: FormBuilder) {
    super();
    this.streetDataFormGroup = this.fb.group(
      {
        id: [''],
        image_path: [''],
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
  }

  onDeleteStreetData() {
    this.modalService.open(ConfirmModalComponent, this.confirmModalPropsData);
  }
}
