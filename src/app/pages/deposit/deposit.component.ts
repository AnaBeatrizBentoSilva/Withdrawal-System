import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-deposit',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective, CommonModule],
  templateUrl: './deposit.component.html',
  styleUrl: './deposit.component.scss',
})
export class DepositComponent {
  deposit = {
    value: '',
    description: '',
  };

  accountId: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!username || !token) {
      alert('Usuário não autenticado. Faça login novamente.');
      return;
    }

    this.apiService.getUserInfo(username).subscribe({
      next: (data) => {
        this.accountId = data.accountId;
        localStorage.setItem('accountId', this.accountId!);
      },
      error: (err) => {
        alert('Erro ao obter informações do usuário. Faça login novamente.');
        console.error('Erro ao obter informações do usuário:', err);
      },
    })
  }

  submitTransfer() {
    const token = localStorage.getItem('token');

    if (!this.accountId || !token) {
      alert('Token ou conta de origem não encontrado. Faça login novamente.');
      return;
    }

    const rawValue = this.deposit.value
      .toString()
      .replace(/[R$.\s]/g, '')
      .replace(',', '.');

    this.apiService
      .createDeposit({
        value: parseFloat(rawValue),
        description: this.deposit.description,
        accountSourceId: this.accountId,
      })
      .subscribe({
        next: (res) => {
          alert('Depósito realizado com sucesso!');
          this.deposit = { value: '', description: '' };
        },
        error: (err) => {
          alert(`Erro ao realizar depósito: ${err.message}`);
          console.error('Erro ao realizar depósito:', err);
        },
      });
  }
}
