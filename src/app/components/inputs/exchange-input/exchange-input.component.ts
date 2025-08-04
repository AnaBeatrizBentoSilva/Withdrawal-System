import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FloatingInputComponent } from '../floating-input/floating-input.component';

@Component({
  selector: 'app-exchange-input',
  standalone: true,
  imports: [CommonModule, FormsModule, FloatingInputComponent],
  templateUrl: './exchange-input.component.html',
  styleUrl: './exchange-input.component.scss'
})
export class ExchangeInputComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() currency: string = 'BRL';
  @Output() currencyChange = new EventEmitter<string>();

  @Input() disabled = false;
  @Input() placeholder: string = 'Valor';

  @Input() decimalMarker: '.' | ',' | ['.', ','] = ',';

  currencies = [
    { code: 'BRL', label: '🇧🇷', prefix: 'R$ ' },
    { code: 'USD', label: '🇺🇸', prefix: '$ ' },
    { code: 'EUR', label: '🇪🇺', prefix: '€ ' },
  ];

  getCurrencyPrefix(currencyCode: string): string {
    const currency = this.currencies.find(c => c.code === currencyCode);
    return currency ? currency.prefix : '';
  }
}
