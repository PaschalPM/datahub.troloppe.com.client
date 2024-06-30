import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  standalone: true,
  imports: [],
  template: `
    <button
      class="text-dodger-blue  dark:text-orange-400 "
      (click)="onClick($event)"
    >
      Edit
    </button>
  `,
})
export class ActionsComponent implements ICellRendererAngularComp {
  public params: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return true;
  }

  onClick($event: any) {
    if (this.params.onClick instanceof Function) {
      const params = {
        event: $event,
        rowData: this.params.node.data,
      };
      this.params.onClick(params)
    }
  }
}
