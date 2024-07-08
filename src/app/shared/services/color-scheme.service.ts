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

  reset(){
    this.setMode('light')
  }
  private listen() {
    this.currentChange.subscribe((value) => {
      this.setColorScheme(value);
    });
  }

  private setMode(mode: 'dark' | 'light') {
    const colorModeFuncts: { [key: string]: () => void } = {
      dark: () => {
        this.document.body.classList.add('dark', 'bg-slate-800');
        this.document.body.classList.remove('bg-lighter-blue');
      },
      light: () => {
        this.document.body.classList.remove('dark', 'bg-slate-800');
        this.document.body.classList.add('bg-lighter-blue');
      },
    };
    return colorModeFuncts[mode]()
  }
  private setColorScheme(value: ColorSchemeType) {
    if (value === 'dark' || value === 'light') {
      this.actualScheme = value;
    }
    if (value === 'light') this.setMode("light")
     else if (value === 'dark') this.setMode("dark")
     else {
      this.actualScheme = 'light';
      this.mediaQuery.observe(SYSTEM_COLOR_SCHEME).subscribe({
        next: (matches) => {
          if (matches) {
            this.setMode("dark")
            this.actualScheme = 'dark';
          }
        },
      });
    }
  }
}
