import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ClickSelfDirective } from '../../directives/click-self.directive';
import { KeyupEscapeDirective } from '../../directives/keyup-escape.directive';
import { MyMatIconComponent } from '../common/my-mat-icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    CommonModule,
    ClickSelfDirective,
    KeyupEscapeDirective,
    MyMatIconComponent,
  ],
  template: `
    @if (template) {
    <div
      appKeyupEscape
      (keyupEscape)="modalService.close()"
      appClickSelf
      (clickSelf)="modalService.close()"
      class="overlay fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-white/25"
    >
      <div
        class="dark:shadow-white-500/50 mx-2 max-h-[calc(100vh-40px)] w-[90%] max-w-[600px] overflow-auto rounded-xl bg-white  text-gray-600 shadow-xl dark:bg-gray-800 dark:text-white dark:shadow-sm dark:shadow-gray-500/50"
      >
        <div class="flex !justify-end p-2">
          <button
            style="line-height: 60%;"
            class="text-3xl font-thin p-2 rounded-full hover:bg-dodger-blue/30 dark:hover:bg-gray-700"
            (click)="modalService.close()"
          >
            <my-mat-icon> close </my-mat-icon>
          </button>
        </div>
        <div class="px-6 py-4 md:px-12 md:py-8">
          <ng-container
            *ngComponentOutlet="template; inputs: inputs"
          ></ng-container>
        </div>
      </div>
    </div>
    }
  `,
})
export class ModalComponent {
  template!: Type<any>;
  inputs!: Record<string, unknown> | undefined;

  constructor(public modalService: ModalService) {
    this.modalService.listen((template, inputs) => {
      this.template = template;
      this.inputs = inputs;
    });
  }
}
