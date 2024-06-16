import { EventEmitter, Inject, Injectable } from '@angular/core';
import { ClientStorageService } from './client-storage.service';
import { MediaQueryService } from './media-query.service';
import { DOCUMENT } from '@angular/common';
import { SYSTEM_COLOR_SCHEME } from '../constants/media-query';
import { COLOR_SCHEME_STORE_KEY } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ColorSchemeService {
  current!: ColorSchemeType;
  actualScheme!: 'dark' | 'light';
  private currentChange = new EventEmitter<ColorSchemeType>();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private mediaQuery: MediaQueryService,
    private css: ClientStorageService
  ) {}

  changeColorScheme(value: ColorSchemeType) {
    this.current = value;
    this.currentChange.emit(this.current);
  }

  init() {
    this.listen();
    this.current = this.css
      .local()
      .get(COLOR_SCHEME_STORE_KEY, 'auto') as ColorSchemeType;
    this.currentChange.emit(this.current);
  }

  save() {
    this.css.local().set(COLOR_SCHEME_STORE_KEY, this.current);
  }

  unsubscribe() {
    this.currentChange.unsubscribe();
  }

  private listen() {
    this.currentChange.subscribe((value) => {
      this.setColorScheme(value);
    });
  }

  private setColorScheme(value: ColorSchemeType) {
    if (value === 'dark' || value === 'light') {
      this.actualScheme = value;
    }
    if (value === 'light') this.document.body.classList.remove('dark');
    else if (value === 'dark') this.document.body.classList.add('dark');
    else {
      this.actualScheme = 'light';
      this.mediaQuery.observe(SYSTEM_COLOR_SCHEME).subscribe({
        next: (matches) => {
          if (matches) {
            this.document.body.classList.add('dark');
            this.actualScheme = 'dark';
          }
        },
      });
    }
  }
}
