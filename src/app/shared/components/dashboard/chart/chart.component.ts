import { Component, Input } from '@angular/core';
import { NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './chart.component.html',
  styles: `
    :host{
      display:contents;
    }
  `,
})
export class ChartComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) results!: any;
  @Input() type: 'horizontal-bar' | 'vertical-bar' | 'pie' = 'horizontal-bar';

  constructor(
    public colorScheme: ColorSchemeService,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.capitalizeKeyNamesInResults();
  }
  
  darkColor = () => {
    return '#FDBA7480';
  };
  lightColor = () => {
    return '#159AFF65';
  };

  get currentColor() {
    if (this.colorScheme.actualScheme === 'dark') {
      return this.darkColor;
    } else {
      return this.lightColor;
    }
  }

  private capitalizeKeyNamesInResults() {
    if (this.results instanceof Array) {
      this.results = this.results.map((result) => {
        if ('name' in result) {
          result.name = this.utils.capitalize(result.name);
        }
        return result;
      });
    }
  }
}
