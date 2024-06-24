import { Pipe, PipeTransform } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Pipe({
  name: 'capitalize',
  standalone: true,
})
export class CapitalizePipe implements PipeTransform {
  constructor(private utils: UtilsService) {}

  transform(value: string, onlyFirstWord = false,): unknown {
    return this.utils.capitalize(value, onlyFirstWord);
  }
}
