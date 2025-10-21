import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-statement',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statement.component.html',
  styleUrl: './statement.component.scss',
})
export class StatementComponent {
  transactions: any[] = [];
  loading = true;
  errorMessage = '';
  accountId: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      this.errorMessage = 'Usuário não autenticado. Faça login novamente.';
      this.loading = false;
      return;
    }

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        this.accountId = data.accountId;
        localStorage.setItem('accountId', this.accountId!);
        this.loadTransactions();
      },
      error: (err) => {
        this.errorMessage = 'Erro ao obter informações do usuário.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  loadTransactions() {
    if (!this.accountId) return;

    this.apiService.getTransactionsByAccount(this.accountId).subscribe({
      next: (data) => {
        // Ordena do mais recente para o mais antigo
        this.transactions = data.sort((a, b) => {
          const dateDiff =
            new Date(b.data).getTime() - new Date(a.data).getTime();
          if (dateDiff !== 0) return dateDiff;
          return b.id.localeCompare(a.id);
        });
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar transações.';
        console.error(err);
        this.loading = false;
      },
    });
  }

  formatValue(transaction: any): string {
    const sign =
      transaction.typeOperation === 'SAQUE' ||
      transaction.typeOperation === 'TRANSFERENCIA'
        ? '-'
        : '';
    return `${sign}${transaction.value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })}`;
  }

  isPositive(transaction: any): boolean {
    return transaction.typeOperation === 'DEPOSITO';
  }

  isNegative(transaction: any): boolean {
    return (
      transaction.typeOperation === 'SAQUE' ||
      transaction.typeOperation === 'TRANSFERENCIA'
    );
  }
}
