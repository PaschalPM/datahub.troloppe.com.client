import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickSelf]',
  standalone: true,
})
export class ClickSelfDirective {
  @Output() clickSelf = new EventEmitter();

  constructor(private elem: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClickSelf(event: Event) {
    const clickedSelf = this.elem.nativeElement === event.target;

    if (clickedSelf) {
      this.clickSelf.emit(event);
    }
  }
}
