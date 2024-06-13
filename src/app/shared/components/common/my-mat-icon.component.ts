import { Component, Input } from '@angular/core';
import { BadgeComponent } from './badge.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'my-mat-icon',
  standalone: true,
  imports: [BadgeComponent, CommonModule],
  template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>

    @if(badge){
    <span class="relative">
      <i class="material-icons">
        <ng-container *ngTemplateOutlet="projected" />
      </i>
      <badge *ngIf="!badgeHidden"> {{ badge }} </badge>
    </span>
    } @else {
    <i class="material-icons">
      <ng-container *ngTemplateOutlet="projected"
    /></i>
    }
  `,
  styles: `
    :host{
      display: contents;
    }
  `,
})
export class MyMatIconComponent {
  @Input() badge!: number | string;
  @Input() badgeHidden = false;
}
