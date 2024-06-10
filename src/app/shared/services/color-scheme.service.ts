import { EventEmitter, Inject, Injectable } from '@angular/core';
import { ClientStorageService } from './client-storage.service';
import { MediaQueryService } from './media-query.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  static COLOR_SCHEME_STORE_KEY = 'colorscheme';
  current!: ColorSchemeType;
  private currentChange = new EventEmitter<ColorSchemeType>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaQuery: MediaQueryService,
    private css: ClientStorageService
  ) {}

  private setColorScheme(value: ColorSchemeType) {
    if (value === 'light') this.document.body.classList.remove('dark');
    else if (value === 'dark') this.document.body.classList.add('dark');
    else
      this.mediaQuery.observe(MediaQueryService.SYSTEM_COLOR_SCHEME).subscribe({
        next: (matches) => {
          if (matches) {
            this.document.body.classList.add('dark');
          }
        },
      });
  }

  changeColorScheme(value: ColorSchemeType) {
    this.current = value;
    this.currentChange.emit(this.current);
  }

  listen() {
    this.currentChange.subscribe((value) => {
      this.setColorScheme(value);
    });
  }

  init() {
    this.current = this.css
      .local()
      .get(
        ColorSchemeService.COLOR_SCHEME_STORE_KEY,
        'auto'
      ) as ColorSchemeType;
    this.currentChange.emit(this.current);
  }

  save() {
    this.css
      .local()
      .set(ColorSchemeService.COLOR_SCHEME_STORE_KEY, this.current);
  }

  unsubscribe() {
    this.currentChange.unsubscribe();
  }
}
