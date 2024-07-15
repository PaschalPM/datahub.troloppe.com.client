import { Component } from '@angular/core';
import { StreetDataService } from '@services/street-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, CellClickedEvent } from 'ag-grid-community';
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
  templateUrl: './street-data.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class StreetDataComponent {
  rowData!: Observable<StreetDataColType[]>;

  colDefs: ColDef<StreetDataColType>[] = [
    { headerName: 'S/N', width: 75, valueGetter: 'node.rowIndex + 1' },
    {
      field: 'unique_code',
      headerName: 'Unique Code',
      width: 150,
      valueGetter: (params) => params.data?.unique_code || 'New Entry',
    },
    { field: 'street_address', headerName: ' Street Address' },
    {
      field: 'sector',
      valueFormatter: (params) => this.utils.capitalize(params.value),
    },
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
