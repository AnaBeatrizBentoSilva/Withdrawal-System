import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uppercaseAll',
  standalone: true
})
export class UppercaseAllPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';
    return value.toUpperCase();
  }

}
