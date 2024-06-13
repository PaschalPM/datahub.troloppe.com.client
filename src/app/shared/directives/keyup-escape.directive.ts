import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appKeyupEscape]',
  standalone: true,
})
export class KeyupEscapeDirective {
  @Output() keyupEscape = new EventEmitter();
  constructor() {}

  @HostListener('document:keyup.escape')
  onKeyupEscape() {
    this.keyupEscape.emit(true);
  }
}
