import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';

@Component({
  selector: 'app-back-btn',
  standalone: true,
  imports: [TextButtonComponent],
  template: `
    <text-button
      text="Back"
      state="neutral"
      withIcon="arrow_back"
      [small]="true"
      (clickEvent)="goBack()"
    />
  `,
})
export class BackBtnComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
