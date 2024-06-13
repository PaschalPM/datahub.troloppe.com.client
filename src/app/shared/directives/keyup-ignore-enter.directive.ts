import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appKeyupIgnoreEnter]',
  standalone: true,
})
export class KeyupIgnoreEnterDirective {
  @Output() keyupIgnoreEnter = new EventEmitter();

  constructor(private elem: ElementRef) {}

  @HostListener('document:keyup', ['$event'])
  onKeyupIgnoreEnter(event: KeyboardEvent) {
    if (event.key !== 'Enter' && this.elem.nativeElement === event.target) {
      this.keyupIgnoreEnter.emit(event);
    }
  }
}
