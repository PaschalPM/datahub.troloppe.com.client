import { Injectable } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  capitalize(str: string, onlyFirstWord = false) {
    str = str
      .replace(/[-_]/, ' ')
      .replace(/[A-Z]./g, (m) => ` ${m}`)
      .trim();
    const pattern = onlyFirstWord ? /\b\w/ : /\b\w/g;
    const cb = (m: string) => m.toUpperCase();
    return str.toLowerCase().replace(pattern, cb);
  }
}
