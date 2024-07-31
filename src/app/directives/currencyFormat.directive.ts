import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCurrencyFormat]',
  standalone: true,
})
export class CurrencyFormatDirective {
  // Regular expression to allow numbers with up to two decimal digits
  private regex: RegExp = new RegExp(/^\d*\.?\d{0,2}$/);
  private el: HTMLInputElement;

  // Constructor to initialize the directive
  // Initializes the reference to the input element and the renderer
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  // Event handler for when field loses focus
  // Formats the value and applies the formatting to the field
  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const formattedValue = this.formatValue(value);
    this.renderer.setProperty(this.el, 'value', formattedValue);
  }

  // Event handler for when field gains focus
  // Remove formatting when gaining focus
  @HostListener('focus', ['$event.target.value'])
  onFocus(value: string): void {
    this.renderer.setProperty(this.el, 'value', this.removeFormatting(value));
  }

  // Event handler for when the user types in the field
  // Remove formatting if value does not match pattern
  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    if (!this.regex.test(value)) {
      this.renderer.setProperty(this.el, 'value', this.removeFormatting(value));
    }
  }

  // Format the value to currency format
  private formatValue(value: string): string {
    if (!value || !this.regex.test(value)) {
      return '';
    }
    // Convert the value to a number, format and add the currency symbol
    const number = parseFloat(value.replace(',', '.'));
    return `R$ ${number.toFixed(2).replace('.', ',')}`;
  }

  // Remove formatting and return pure value
  private removeFormatting(value: string): string {
    return value.replace('R$ ', '').replace(',', '.');
  }
}
