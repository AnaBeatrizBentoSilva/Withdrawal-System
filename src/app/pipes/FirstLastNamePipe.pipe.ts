import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstLastName',
  standalone: true
})
export class FirstLastNamePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const names = value.trim().split(' ');
    if (names.length === 1) {
      return names[0];
    }

    return `${names[0]} ${names[names.length - 1]}`;
  }
}
