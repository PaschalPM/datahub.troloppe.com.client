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
      class="ag-theme-quartz !bg-transparent dark:hidden h-[calc(100vh-250px)] md:h-[375px]"
      [columnDefs]="colDefs"
      style="height: 400px"
      [defaultColDef]="defaultColDefs"
      [animateRows]="true"
      (cellClicked)="onCellClick($event)"
      rowClass="cursor-pointer"
    ></ag-grid-angular>

    <ag-grid-angular
      [rowData]="rowData | async"
      class="ag-theme-quartz-dark !bg-transparent hidden dark:block h-[calc(100vh-250px)] md:h-[375px]"
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
    { field: 'unique_code' },
    { field: 'street_address' },
    { field: 'sector' },
    { field: 'section' },
    { field: 'location' },
    { field: 'image_path', sortable: false, filter: false },
    { field: 'is_verified', filter: false },
    {
      headerName: 'Actions',
      cellRenderer: ActionsComponent,
      cellRendererParams: { onClick: this.onEditClick.bind(this) },
    },
  ];

  defaultColDefs: ColDef<StreetDataColType> = {
    sortable: true,
    filter: true,
  };
  constructor(private sd: StreetDataService, private router: Router) {}

  ngOnInit(): void {
    this.streetData();
  }

  onCellClick(event: CellClickedEvent) {
    if (event.colDef.headerName !== 'Actions') {
      const streetDataId = event.data.id;
      this.router.navigateByUrl(`/dashboard/street-data/${streetDataId}`);
    }
  }

  onEditClick({rowData:{id}}: any) {
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
