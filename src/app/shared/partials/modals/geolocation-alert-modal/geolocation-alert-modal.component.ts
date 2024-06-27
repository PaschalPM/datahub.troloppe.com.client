import { Component } from '@angular/core';
import { TextButtonComponent } from '../../../components/common/text-button/text-button.component';
import { ModalService } from '../../../services/modal.service';
import { GeolocationService } from '../../../services/geolocation.service';

@Component({
  selector: 'geolocation-alert-modal',
  standalone: true,
  imports: [TextButtonComponent],
  template: `
    <div class="space-y-6">
      <h1 class="text-2xl font-medium">Enable Geolocation</h1>
      <div class="mt-1  w-full font-normal">
        <p>
          Geolocation is disabled. Please enable geolocation to use this form
          effectively. Learn how to enable geolocation here:
          <a
            href="https://www.wikihow.com/Enable-Location-Services-on-Google-Chrome"
            target="_blank"
            class="text-dodger-blue hover:text-dodger-blue/70 dark:text-orange-400 dark:hover:text-orange-400/70"
          >
            www.wikihow.com
          </a>
        </p>
      </div>
      <div class="flex justify-end">
        <text-button text="ok" (clickEvent)="onOk()"></text-button>
      </div>
    </div>
  `,
})
export class GeolocationAlertModalComponent {
  constructor(
    private modalService: ModalService,
    private geo: GeolocationService
  ) {}

  onOk() {
    this.geo.displayPopupIfAble();
    this.modalService.close();
  }
}
