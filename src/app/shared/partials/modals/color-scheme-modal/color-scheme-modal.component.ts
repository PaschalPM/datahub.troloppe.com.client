import { Component } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ColorSchemeService } from '../../../services/color-scheme.service';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from '../../../components/common/text-button/text-button.component';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { MyMatIconComponent } from '../../../components/common/my-mat-icon.component';
import { UtilsService } from '@services/utils.service';

@Component({
  selector: 'app-color-scheme-modal',
  standalone: true,
  imports: [
    CommonModule,
    TextButtonComponent,
    CapitalizePipe,
    MyMatIconComponent,
  ],
  templateUrl: './color-scheme-modal.component.html',
  styles: ``,
})
export class ColorSchemeModalComponent {
  public selectedScheme!: ColorSchemeType;
  schemes = ['auto', 'light', 'dark'];

  constructor(
    private modalService: ModalService,
    private colorSchemeService: ColorSchemeService,
    public utils: UtilsService
  ) {}

  

  ngOnInit(): void {
    this.selectedScheme = this.colorSchemeService.current;
  }

  ngOnDestroy(): void {
    this.colorSchemeService.init();
  }

  onSelectScheme(event: Event) {
    const currentTarget = event.currentTarget as HTMLElement;
    this.selectedScheme = currentTarget.dataset['scheme'] as ColorSchemeType;
    this.colorSchemeService.changeColorScheme(this.selectedScheme);
  }

  onOk() {
    this.colorSchemeService.save();
    this.modalService.close();
  }
}
