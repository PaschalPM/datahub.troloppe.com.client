import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SpinnerComponent } from '@components/spinner/spinner.component';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, SpinnerComponent],
  template: `
    @if (isOpen) {
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/25"
    >
      <app-spinner/>
    </div>
    }
  `,
  styles: ``,
})
export class LoaderComponent {
  isOpen = false;

  constructor(public loader: LoaderService) {}

  ngOnInit(): void {
    this.loader.observe().subscribe((value) => {
      this.isOpen = value;
    });
  }
}
