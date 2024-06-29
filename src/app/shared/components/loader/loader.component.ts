import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  template: `
    @if (isOpen) {
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/25"
    >
      <div class="loader-spinner size-24 border-4 rounded-full border-r-transparent border-l-transparent"> 
      </div>
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
