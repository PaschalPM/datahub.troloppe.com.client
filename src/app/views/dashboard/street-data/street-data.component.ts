import { Component } from '@angular/core';
import { StreetDataService } from '../../../shared/services/street-data.service';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { StreetDataColType } from '../../../shared/types/street-data';
import { TextButtonComponent } from '../../../shared/components/common/text-button/text-button.component';
import { Router } from '@angular/router';
import { ActiveLocationIndicatorComponent } from '../../../shared/components/dashboard/active-location-indicator/active-location-indicator.component';
import { MyMatIconComponent } from '../../../shared/components/common/my-mat-icon.component';

@Component({
  selector: 'app-street-data',
  standalone: true,
  imports: [
    AgGridAngular,
    TextButtonComponent,
    ActiveLocationIndicatorComponent,
    MyMatIconComponent
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
      [rowData]="rowData"
      class="ag-theme-quartz !bg-transparent dark:hidden"
      [columnDefs]="colDefs"
      style="height: 400px"
    ></ag-grid-angular>

    <ag-grid-angular
      [rowData]="rowData"
      class="ag-theme-quartz-dark !bg-transparent hidden dark:block"
      style="height: 400px"
      [columnDefs]="colDefs"
    ></ag-grid-angular>
  `,
  // templateUrl: './street-data.component.html',
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class StreetDataComponent {
  rowData: StreetDataColType[] = [];

  colDefs: ColDef<StreetDataColType>[] = [
    { field: 'unique_code' },
    { field: 'street_address' },
    { field: 'sector' },
    { field: 'section' },
    { field: 'location' },
    { field: 'image_path' },
    { field: 'is_verified' },
  ];
  constructor(private sd: StreetDataService, private router: Router) {}

  ngOnInit(): void {
    this.streetData();
  }

  streetData() {
    this.sd.getStreetData().subscribe({
      next: (value) => {
        this.rowData = value;
      },
    });
  }

  routeToNewStreetView() {
    this.router.navigateByUrl('/dashboard/street-data/new');
  }
  ngOnDestroy(): void {}
}
