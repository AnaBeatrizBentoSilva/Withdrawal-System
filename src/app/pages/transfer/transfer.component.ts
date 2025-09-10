import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [FormsModule, NgxMaskDirective],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  transfer = {
    value: '',
    beneficiaryAgency: '',
    beneficiaryAccountNumber: '',
    description: ''
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
      alert('Token ou conta de origem não encontrada. Faça login novamente.');
      return;
    }

    const transferValue = parseFloat(this.transfer.value.toString().replace(/[R$.\s]/g, '').replace(',', '.'));

    const currentHour = new Date().getHours();
    const maxTransferLimit = currentHour >= 22 || currentHour < 6 ? 1000 : 10000;

    if (transferValue > maxTransferLimit) {
      alert(`O valor máximo de transferência é R$ ${maxTransferLimit} neste horário.`);
      return;
    }

    this.apiService.createTransfer({
      value: transferValue,
      description: this.transfer.description,
      accountSourceId: this.accountId,
      beneficiaryAgency: this.transfer.beneficiaryAgency,
      beneficiaryAccountNumber: this.transfer.beneficiaryAccountNumber
    }).subscribe({
      next: () => {
        alert('Transferência realizada com sucesso!');
        this.transfer = { value: '', beneficiaryAgency: '', beneficiaryAccountNumber: '', description: '' };
      },
      error: (err) => {
        alert(`Erro ao realizar transferência: ${err.message}`);
        console.error('Erro ao realizar transferência:', err);
      }
    });
  }
}
