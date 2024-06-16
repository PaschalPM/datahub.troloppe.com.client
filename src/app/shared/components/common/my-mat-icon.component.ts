import { Component, Input } from '@angular/core';
import { BadgeComponent } from './badge.component';
import { CommonModule } from '@angular/common';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'my-mat-icon',
  standalone: true,
  imports: [BadgeComponent, CommonModule],
  template: `
    <ng-template #projected>
      <ng-content />
    </ng-template>

    @if(badge){
    <span [class]="utils.cn('relative', class)">
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
  @Input() badge!: number | string | undefined;
  @Input() badgeHidden = false;
  @Input() class = '';

  constructor(public utils: UtilsService){}
}
