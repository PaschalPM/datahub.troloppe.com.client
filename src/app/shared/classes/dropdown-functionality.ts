import { ElementRef } from '@angular/core';

export class DropdownFunctionality {
  isDropdownOpen!: boolean;
  dropdownHeight!: number;
  openUp!: boolean;

  get dropdownMaxHeight(){
    return `max-height: ${this.dropdownHeight}px`
  }

  constructor(
    isDropdownOpen = false,
    dropdownHeight = 240,
    openUp = false
  ) {
    this.isDropdownOpen = isDropdownOpen;
    this.dropdownHeight = dropdownHeight;
    this.openUp = openUp;
  }

  protected checkDropdownPosition(dropdownContainer: ElementRef<HTMLElement>,) {
    const dropdownElement = dropdownContainer.nativeElement;
    const rect = dropdownElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    this.openUp =
      spaceBelow < this.dropdownHeight && spaceAbove > this.dropdownHeight;
  }
}
