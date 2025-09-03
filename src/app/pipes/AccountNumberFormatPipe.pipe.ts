import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountNumberFormat',
  standalone: true
})
export class AccountNumberFormatPipe implements PipeTransform {

  transform(value: string): string {
    return `${value.slice(0, -1)} ${value.slice(-1)}`;
  }

}
