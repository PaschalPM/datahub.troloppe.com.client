import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '../../common/my-mat-icon.component';
import { UtilsService } from '../../../services/utils.service';
import { ModalService } from '../../../services/modal.service';
import { ActiveLocationFormModalComponent } from '../../../partials/modals/active-location-form-modal/active-location-form-modal.component';
import { ActiveLocationService } from '../../../services/active-location.service';
import { PermissionService } from '../../../services/permission.service';
import { UserRoles } from '../../../enums/user-roles';

@Component({
  selector: 'dashboard-active-location-indicator',
  standalone: true,
  imports: [NgIf, MyMatIconComponent],
  template: `
    <div
      class="my-6 mixin/base:font-bold mixin/base:font-mono mixin/base:flex mixin/base:items-center mixin/base:gap-2"
    >
      <ng-container
        *ngIf="activeLocation; then showActiveLocation; else setActiveLocation"
      >
      </ng-container>
    </div>

    <!---: Show Active Location -->
    <ng-template #showActiveLocation>
      <div
        [class]="
          utils.cn('inline-flex items-center gap-2', {
            'cursor-pointer': isPermitted && !nonEditable
          })
        "
        (click)="isPermitted && !nonEditable && onOpenFormModal()"
      >
        <div
          class="mixin/base text-green-700 dark:text-green-300 animate-pulse"
        >
          <my-mat-icon *ngIf="isPermitted && !nonEditable"> edit_location_alt </my-mat-icon>
          <my-mat-icon *ngIf="!isPermitted || nonEditable"> location_on </my-mat-icon>
          <div>{{ activeLocation }}</div>
        </div>
      </div>
    </ng-template>

    <!---: Set Active Location -->
    <ng-template #setActiveLocation>
      <button
        *ngIf="isPermitted"
        title="Set Location"
        class="mixin/base bg-red-500 text-white p-2 rounded-md hover:opacity-75"
        (click)="onOpenFormModal()"
      >
        <my-mat-icon> edit_location_alt </my-mat-icon>
      </button>
    </ng-template>
  `,
})
export class ActiveLocationIndicatorComponent {
  @Input() nonEditable = false
  activeLocation: string | null = null;
  isPermitted = false;

  constructor(
    public utils: UtilsService,
    private modalService: ModalService,
    private activeLocationService: ActiveLocationService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.retrieveAndSetActiveLocation();
    this.setPermission()
  }

  onOpenFormModal() {
    this.modalService.open(ActiveLocationFormModalComponent);
  }

  private retrieveAndSetActiveLocation() {
    this.activeLocationService.activeLocation().subscribe((value) => {
      if (value) {
        this.activeLocation = value.name;
      } else {
        this.activeLocation = null;
      }
    });
  }

  private setPermission(){
    this.isPermitted = this.permissionService.isPermitted([UserRoles.Admin, UserRoles.ResearchManager])
  }
}
