import { Component } from '@angular/core';
import { ExchangeInputComponent } from '../../components/inputs/exchange-input/exchange-input.component';

type Currency = 'BRL' | 'USD' | 'EUR';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [ExchangeInputComponent],
  templateUrl: './exchange.component.html',
  styleUrl: './exchange.component.scss'
})
export class ExchangeComponent {

  fromValue = '';
  fromCurrency: Currency = 'BRL';
  toValue = '';
  toCurrency: Currency = 'USD';

  exchangeRates: Record<Currency, number> = {
    BRL: 1,
    USD: 0.18,
    EUR: 0.16
  };

  converter() {
    const strValue = String(this.fromValue);
    const cleaned = strValue
      .replace(/[^\d,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');

    const value = parseFloat(cleaned);

    if (isNaN(value)) {
      this.toValue = 'Valor inválido';
      return;
    }

    const valueInBRL = value / this.exchangeRates[this.fromCurrency];
    const converted = valueInBRL * this.exchangeRates[this.toCurrency];

    this.toValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: this.toCurrency,
    }).format(converted);
  }


}
