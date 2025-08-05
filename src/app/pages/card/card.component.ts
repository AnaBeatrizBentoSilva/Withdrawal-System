import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  cardUser = {
    nameUser: 'Ana B B Silva',
    numberCard: '4698 2456 2356 2514',
    agency: '2561',
    account: '56178952 0',
    code: '865',
    validity: '07/30'
  };
}
