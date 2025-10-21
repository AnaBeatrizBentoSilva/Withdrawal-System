import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';
import { SummaryProductCardComponent } from '../../components/cards/summary-product-card/summary-product-card.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatTableModule, MatCardModule, MatButtonModule, CommonModule, MatDialogModule, NgxChartsModule, SummaryProductCardComponent, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  latestTransactions: any[] = [];
  accountId: string | null = null;

  summary = {
    deposits: { count: 0, total: 0 },
    withdrawals: { count: 0, total: 0 },
    transfers: { count: 0, total: 0 }
  };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) return;

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        this.accountId = data.accountId;
        localStorage.setItem('accountId', this.accountId!);
        this.loadLatestTransactions();
      },
      error: (err) => console.error(err)
    });
  }

  loadLatestTransactions() {
    if (!this.accountId) return;

    this.apiService.getTransactionsByAccount(this.accountId).subscribe({
      next: (data) => {
        // Ordena do mais recente para o mais antigo
        const sorted = data.sort((a, b) => {
          const dateDiff = new Date(b.data).getTime() - new Date(a.data).getTime();
          if (dateDiff !== 0) return dateDiff;
          return b.id.localeCompare(a.id);
        });

        // Pega apenas as 5 últimas
        this.latestTransactions = sorted.slice(0, 5);

        // Atualiza o resumo
        this.getSummary(data);
      },
      error: (err) => console.error(err)
    });
  }

  getSummary(transactions: any[]) {
    const deposits = transactions.filter(t => t.typeOperation === 'DEPOSITO');
    const withdrawals = transactions.filter(t => t.typeOperation === 'SAQUE');
    const transfers = transactions.filter(t => t.typeOperation === 'TRANSFERENCIA');

    this.summary = {
      deposits: { count: deposits.length, total: deposits.reduce((sum, t) => sum + t.value, 0) },
      withdrawals: { count: withdrawals.length, total: withdrawals.reduce((sum, t) => sum + t.value, 0) },
      transfers: { count: transfers.length, total: transfers.reduce((sum, t) => sum + t.value, 0) }
    };
  }

  formatValue(transaction: any): string {
    const sign = transaction.typeOperation === 'SAQUE' || transaction.typeOperation === 'TRANSFERENCIA' ? '-' : '';
    return `${sign}${transaction.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
  }

  isPositive(transaction: any): boolean {
    return transaction.typeOperation === 'DEPOSITO';
  }

  isNegative(transaction: any): boolean {
    return transaction.typeOperation === 'SAQUE' || transaction.typeOperation === 'TRANSFERENCIA';
  }
}
