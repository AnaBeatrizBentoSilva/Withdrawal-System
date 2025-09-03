import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDate',
  standalone: true
})
export class ExpiryDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return '';

    const date = new Date(value);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    return `${month}/${year}`;
  }
}
