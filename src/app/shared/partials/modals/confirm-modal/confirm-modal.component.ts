import { Component, Input } from '@angular/core';
import { MyMatIconComponent } from '@components/common/my-mat-icon.component';
import { TextButtonComponent } from '@components/common/text-button/text-button.component';
import { ModalService } from '@services/modal.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [MyMatIconComponent, TextButtonComponent],
  template: ` <div
    class="space-y-6 -mt-4 text-center mixin/error:text-red-500 dark:mixin/error:text-red-400 mixin/warning:text-orange-500 dark:mixin/warning:text-orange-400"
  >
    <div class="text-center">
      <my-mat-icon
        [class]="
          utils.cn('text-6xl text-red-500 dark:text-red-400', {
            'mixin/error': severity === 'error',
            'mixin/warning': severity === 'warning',
          })
        "
      >
        {{ matIconName }}
      </my-mat-icon>
    </div>
    <h1
      [class]="
        utils.cn('text-xl font-medium text-red-500 dark:text-red-400', {
          'mixin/error': severity === 'error',
          'mixin/warning': severity === 'warning',
        })
      "
    >
      {{ title }}
    </h1>
    <p>{{ message }}</p>
    <div class="text-center flex justify-center">
      <text-button text="Yes" (clickEvent)="onOk()"> </text-button>
    </div>
  </div>`,
})
export class ConfirmModalComponent {
  @Input({ required: true }) matIconName!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) message!: string;
  @Input({ required: true }) ok!: () => void;

  @Input() severity: 'error' | 'warning' = 'error';

  constructor(private modalService: ModalService, public utils: UtilsService) {}

  onOk() {
    this.ok();
    this.modalService.close();
  }
}
