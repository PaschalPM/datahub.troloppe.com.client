import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  private capitalize(str: string, onlyFirstWord = false) {
    str = str.replace('-', ' ').replace('_', ' ')
    const pattern = onlyFirstWord ? /\b\w/ : /\b\w/g;
    const cb = (m: string) => m.toUpperCase();
    return str.toLowerCase().replace(pattern, cb);
  }

  transform(value: string, onlyFirstWord = false): unknown {
    return this.capitalize(value, onlyFirstWord);
  }
}
