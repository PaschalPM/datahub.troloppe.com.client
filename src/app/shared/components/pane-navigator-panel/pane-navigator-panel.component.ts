import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'pane-navigator-panel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="overflow-auto my-3">
      <div
        [class]="
          utils.cn(
            'border-b whitespace-nowrap min-w-max w-full',
            {
              'border-none dark:bg-white/5 p-1 rounded-lg bg-white shadow-md backdrop-blur-md':
                type === 'pill'
            },
            class
          )
        "
      >
        @for(tab of tabs; track tab.pane ){
        <button
          [class]="
            utils.cn(tabClass, tab.pane === activePane ? activeTabClass : '')
          "
          (click)="onChangeActivePane(tab.pane)"
        >
          {{ tab.tabLabel }}
        </button>
        }
      </div>
    </div>
  `,
})
export class PaneNavigatorPanelComponent {
  @Input({ required: true }) activePane!: string;
  @Input({ required: true }) tabs!:
    | {
        pane: string;
        tabLabel: string;
      }[]
    | null;
  @Input() type: 'tab' | 'pill' = 'tab';
  @Input() class = '';
  @Output() activePaneChange = new EventEmitter();

  tabClass =
    'p-2 px-4 text-black/50 dark:text-white/50 transition-all text-sm ';
  get activeTabClass() {
    return this.type === 'tab'
      ? 'border-b-2 border-black text-black dark:text-white p-2 px-4 font-medium dark:border-white'
      : 'bg-dodger-blue/20 text-black  dark:bg-orange-300/50 dark:text-white rounded-lg font-medium';
  }

  constructor(public utils: UtilsService) {}

  onChangeActivePane(selectedPane: string) {
    this.activePane = selectedPane;
    this.activePaneChange.emit(this.activePane);
  }
}
