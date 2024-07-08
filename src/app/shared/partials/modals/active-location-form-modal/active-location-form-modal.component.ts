import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectDropdownComponent } from '@components/select-dropdown/select-dropdown.component';
import { NewStreetDataFormService } from '@services/new-street-data-form.service';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ActiveLocationService } from '@services/active-location.service';
import { ModalService } from '@services/modal.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-active-location-form-modal',
  standalone: true,
  imports: [SelectDropdownComponent, TextButtonComponent],
  template: `
    <div class="min-h-36 relative">
      <div class="prose">
        <h3 class="dark:text-white">Set Active Location</h3>
      </div>
      <dashboard-select-dropdown
        name="location_id"
        [formGroup]="activeLocationFormGroup"
        bindLabel="name"
        bindValue="id"
        [formIsSubmitting]="formIsSubmitting"
        [items]="locationOptions"
        [clearable]="true"
        appendTo="body"
        placeholder="No Active Location"
      >
      </dashboard-select-dropdown>

      <div class="flex justify-end gap-2 mt-5">
        <text-button
          [text]="btnText"
          [disabled]="isActivationDisallowed"
          (clickEvent)="setActiveLocation()"
        ></text-button>
      </div>
    </div>
  `,
})
export class ActiveLocationFormModalComponent {
  activeLocationFormGroup!: FormGroup;
  locationControl!: FormControl;
  formIsSubmitting = false;
  locationOptions: IdAndNameType[] = [];
  currentActiveLocation: LocationType | null = null;

  private setActiveLocationSubscription: Subscription | null = null;

  // Getters
  get isActivationDisallowed() {
    const cond1 = this.currentActiveLocation?.id === this.locationControl.value;
    const cond2 =
      this.currentActiveLocation === null && !this.locationControl.value;
    return cond1 || cond2;
  }
  get btnText() {
    return this.locationControl.value ? 'activate' : 'deactivate';
  }

  constructor(
    private fb: FormBuilder,
    private activeLocationService: ActiveLocationService,
    private nsdfs: NewStreetDataFormService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private loader: LoaderService
  ) {
    this.activeLocationFormGroup = this.fb.group({
      location_id: [null],
    });
    this.locationControl = this.activeLocationFormGroup.controls?.[
      'location_id'
    ] as FormControl;
  }

  ngOnInit(): void {
    this.retrieveLocationOptions();
    this.retrieveActiveLocation();
  }

  setActiveLocation() {
    if (confirm('Are you sure you want to set a new active location?')) {
      this.loader.start();
      this.setActiveLocationSubscription = this.activeLocationService
        .setActiveLocation(this.activeLocationFormGroup.value)
        .subscribe((value) => {
          let msg = 'New location activated and notifications sent out.';
          if (!value) {
            msg = 'No active location available';
          }
          this.toastr.success(msg, 'Success');
          this.loader.stop();
          this.modalService.close();
        });
    }
  }

  ngOnDestroy(): void {
    this.setActiveLocationSubscription?.unsubscribe();
  }

  private retrieveLocationOptions() {
    this.nsdfs.locations().subscribe((event) => {
      this.locationOptions = event?.value as LocationType[];
    });
  }

  private retrieveActiveLocation() {
    this.activeLocationService.activeLocation().subscribe((activeLocation) => {
      if (activeLocation) {
        this.currentActiveLocation = activeLocation;
        this.locationControl.setValue(activeLocation.id);
      }
    });
  }
}
