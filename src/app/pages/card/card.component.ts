import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UppercaseAllPipe } from "../../pipes/UppercaseAllPipe.pipe";
import { ExpiryDatePipe } from "../../pipes/ExpiryDatePipe.pipe";
import { CardNumberFormatPipe } from "../../pipes/CardNumberFormatPipe.pipe";
import { AccountNumberFormatPipe } from "../../pipes/AccountNumberFormatPipe.pipe";
import { FirstLastNamePipe } from '../../pipes/FirstLastNamePipe.pipe';
@Component({
  selector: 'app-card',
  standalone: true,
  imports: [UppercaseAllPipe, ExpiryDatePipe, CardNumberFormatPipe, AccountNumberFormatPipe, FirstLastNamePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  cardUser = {
    cardHolderName: '',
    cardNumber: '',
    agency: '',
    accountNumber: '',
    securityCode: '',
    expiryDate: ''
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');

    if (!username) {
      console.warn('Username não encontrado no localStorage!');
      return;
    }

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        this.cardUser.cardHolderName = data.cardHolderName;
        this.cardUser.cardNumber = data.cardNumber;
        this.cardUser.agency = data.agency;
        this.cardUser.accountNumber = data.accountNumber;
        this.cardUser.securityCode = data.securityCode;
        this.cardUser.expiryDate = data.expiryDate;
      },
      error: (err) => {
        console.error('Erro ao carregar informações do usuário:', err);
      }
    });
  }
}
