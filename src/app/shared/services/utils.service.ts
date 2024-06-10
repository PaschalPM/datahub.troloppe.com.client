import { Injectable } from '@angular/core';
import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  getUrlParam(name: string): string | null {
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);

    return urlParams.get(name);
  }

  cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
}
