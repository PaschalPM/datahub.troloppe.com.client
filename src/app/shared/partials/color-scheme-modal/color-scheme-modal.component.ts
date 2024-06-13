import { Component } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ColorSchemeService } from '../../services/color-scheme.service';
import { CommonModule } from '@angular/common';
import { TextButtonComponent } from '../../components/common/text-button/text-button.component';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-color-scheme-modal',
  standalone: true,
  imports: [CommonModule, TextButtonComponent, CapitalizePipe],
  templateUrl: './color-scheme-modal.component.html',
  styles: ``
})
export class ColorSchemeModalComponent {
  public selectedScheme!: ColorSchemeType;
  schemes = ['auto', 'light', 'dark'];

  constructor(
    private modalService: ModalService,
    private colorSchemeService: ColorSchemeService,
  ) {}

  ngOnInit(): void {
    this.selectedScheme = this.colorSchemeService.current;
  }

  ngOnDestroy(): void {
    this.colorSchemeService.init();
  }

  onSelectScheme(event: Event) {
    const target = event.target as HTMLElement;
    const innerText = target.innerText.toLowerCase().trim() as ColorSchemeType;
    this.selectedScheme = innerText;
    this.colorSchemeService.changeColorScheme(this.selectedScheme);
  }

  onOk() {
    this.colorSchemeService.save();
    this.modalService.close();
  }
}

