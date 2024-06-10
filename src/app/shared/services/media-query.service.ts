import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {
  // Breakpoints
  static SMALL = '(min-width: 640px)';
  static MEDIUM = '(min-width: 768px)';
  static LARGE = '(min-width: 1024px)';
  static EXTRA_LARGE = '(min-width: 1280px)';

  // Color Scheme
  public static SYSTEM_COLOR_SCHEME = '(prefers-color-scheme: dark)';

  constructor() {}

  observe(query: string) {
    const mediaQuery = window.matchMedia(query);
    const observable$ = fromEvent<MediaQueryList>(mediaQuery, 'change').pipe(
      map((value) => value.matches),
      startWith(mediaQuery.matches)
    );
    return observable$;
  }
}
