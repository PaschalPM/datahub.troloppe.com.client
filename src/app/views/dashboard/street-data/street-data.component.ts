import { Component } from '@angular/core';
import { StreetDataService } from '@services/street-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { StreetDataColType } from '../../../shared/types/street-data';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { Router } from '@angular/router';
import { ActiveLocationIndicatorComponent } from '@components/dashboard/active-location-indicator/active-location-indicator.component';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ActionsComponent } from '@components/ag-grid/street-data/actions/actions.component';
import { UtilsService } from '@services/utils.service';
import { PermissionService } from '@services/permission.service';
import { ImagePreviewComponent } from '@components/ag-grid/street-data/image-preview/image-preview.component';
import { ColorSchemeService } from '@services/color-scheme.service';

@Component({
  selector: 'app-street-data',
  standalone: true,
  imports: [
    AgGridAngular,
    TextButtonComponent,
    ActiveLocationIndicatorComponent,
    MyMatIconComponent,
    AsyncPipe,
  ],
  template: `
    <div class="my-4 flex justify-between items-center">
      <dashboard-active-location-indicator />
      <text-button
        withIcon="add"
        [isFlexed]="true"
        (clickEvent)="routeToNewStreetView()"
        text="New Street Data"
      ></text-button>
    </div>

    <ag-grid-angular
      [rowData]="rowData | async"
      class="!bg-transparent h-[calc(100vh-250px)] md:h-[375px]"
      [class.ag-theme-quartz-dark]="colorScheme.actualScheme === 'dark'"
      [class.ag-theme-quartz]="colorScheme.actualScheme === 'light'"
      [columnDefs]="colDefs"
      [defaultColDef]="defaultColDefs"
      [animateRows]="true"
      (cellClicked)="onCellClick($event)"
      rowClass="cursor-pointer"
    ></ag-grid-angular>
  `,
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class StreetDataComponent {
  rowData!: Observable<StreetDataColType[]>;

  colDefs: ColDef<StreetDataColType>[] = [
    { headerName: 'S/N', width: 75,valueGetter: "node.rowIndex + 1"},
    { field: 'unique_code', headerName: 'Unique Code', width: 150, valueGetter: (params) => params.data?.unique_code || 'New Entry' },
    { field: 'street_address', headerName: ' Street Address' },
    { field: 'sector' },
    { field: 'section' },
    { field: 'location' },
    {
      field: 'image_path',
      headerName: 'Image Preview',
      cellRenderer: ImagePreviewComponent,
      filter: false,
      sortable: false,
      headerClass: '!flex !justify-center',
    },
    {
      field: 'is_verified',
      headerName: 'Is Verified',
      width: 150,
    },
    {
      field: 'created_at',
      headerName: 'Creation Date',
      valueFormatter: (params) => this.utils.utcToFormattedDate(params.value),
      filter: false,
    },
    {
      field: 'creator',
      width: 150,
      hide: !(this.permission.isAdmin || this.permission.isResearchManager),
    },
    {
      headerName: 'Actions',
      cellRenderer: ActionsComponent,
      cellRendererParams: { onClick: this.onEditClick.bind(this) },
      width: 150,
    },
  ];

  defaultColDefs: ColDef<StreetDataColType> = {
    sortable: true,
    filter: true,
    autoHeight: true,
    cellClass: '!flex !items-center',
  };
  constructor(
    private sd: StreetDataService,
    private router: Router,
    private utils: UtilsService,
    private permission: PermissionService,
    public colorScheme: ColorSchemeService
  ) {}

  ngOnInit(): void {
    this.streetData();
  }

  onCellClick(event: CellClickedEvent) {
    if (!(event.colDef.headerName === 'Actions')) {
      const streetDataId = event.data.id;
      this.router.navigateByUrl(`/dashboard/street-data/${streetDataId}`);
    }
  }

  onEditClick({ rowData: { id } }: any) {
    this.router.navigateByUrl(`/dashboard/street-data/edit/${id}`);
  }

  routeToNewStreetView() {
    this.router.navigateByUrl('/dashboard/street-data/new');
  }

  ngOnDestroy(): void {}

  private streetData() {
    this.rowData = this.sd.getStreetData();
  }
}
