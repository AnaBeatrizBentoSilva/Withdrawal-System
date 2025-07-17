import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss'
})
export class StatementComponent {
  transactions = [
    { date: '2025-07-16', description: 'Transferência enviada', amount: -500, type: 'transfer' },
    { date: '2025-07-14', description: 'Luz', amount: -150, type: 'bill' },
    { date: '2025-07-14', description: 'Energia', amount: -200, type: 'bill' },
    { date: '2025-07-15', description: 'Doceria Pão Doce', amount: -50, type: 'purchase' },
    { date: '2025-07-15', description: 'Restaurante Saboroso', amount: -80, type: 'purchase' },
    { date: '2025-07-15', description: 'Supermercado Lourencini', amount: -300, type: 'purchase' },
    { date: '2025-07-16', description: 'Depósito', amount: 2000, type: 'deposit' },
  ]
}
