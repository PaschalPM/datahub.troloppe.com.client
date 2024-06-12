import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MediaQueryService {

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
