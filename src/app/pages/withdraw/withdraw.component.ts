import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrintingComponent } from '../../components/printing/printing.component';
import { NgxMaskDirective } from 'ngx-mask';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PrintingComponent,
    NgxMaskDirective
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss',
})
export class WithdrawComponent {
  // Variáveis que controlam o estado do componente
  withdrawAmount: string = '';
  errorMessage: string = '';
  noteCounts: { [key: number]: number } = {};
  printing: boolean = false;
  showNotes: boolean = false;

  constructor(private apiService: ApiService) {}

  // Getter para obter as chaves das notas (em número)
  get noteKeys(): number[] {
    return Object.keys(this.noteCounts).map((key) => +key);
  }

  // Getter para total de notas
  get totalNotes(): number {
    return Object.values(this.noteCounts).reduce((total, count) => total + count, 0);
  }

  // Getter para converter o valor string em número
  get withdrawAmountNumber(): number {
    const raw = this.withdrawAmount;

    if (raw === null || raw === undefined) return 0;

    const value = typeof raw === 'string' ? raw : String(raw);

    const numericString = value
      .replace('R$ ', '')
      .replace(/\./g, '')
      .replace(',', '.');

    return parseFloat(numericString) || 0;
  }

  // Método para processar o saque
  processWithdrawal() {
    const amount = this.withdrawAmountNumber;
    if (!amount || amount <= 0) {
      this.errorMessage = 'Digite um valor válido para saque.';
      return;
    }

    const accountId = localStorage.getItem('accountId');
    if (!accountId) {
      this.errorMessage = 'Conta não encontrada. Faça login novamente.';
      return;
    }

    this.printing = true;
    this.showNotes = false;
    this.errorMessage = '';

    this.apiService.createWithdraw({
      value: amount,
      description: 'Saque realizado',
      accountSourceId: accountId
    }).subscribe({
      next: (res) => {
        // Backend aprovou o saque
        this.calculateNoteCounts(amount, [50, 20, 10]);
        this.printing = false;
        this.showNotes = true;
      },
      error: (err) => {
        this.printing = false;
        this.errorMessage = err.error?.message || 'Erro ao processar saque';
        this.noteCounts = {}
      }
    });
  }

  // Método para calcular as notas
  calculateNoteCounts(amount: number, notes: number[]) {
    for (const note of notes) {
      const count = Math.floor(amount / note);
      if (count > 0) {
        this.noteCounts[note] = count;
        amount -= count * note;
      }
    }
  }

  // Método para retornar o caminho da imagem da nota
  getImageForNote(note: number): string {
    const imagePaths: { [key: number]: string } = {
      50: '../../../assets/svg/fifty-note.svg',
      20: '../../../assets/svg/twenty-note.svg',
      10: '../../../assets/svg/ten-note.svg',
    };
    return imagePaths[note] || 'assets/images/default-note.png';
  }

  // Método para resetar o formulário
  reset() {
    this.withdrawAmount = '';
    this.errorMessage = '';
    this.noteCounts = {};
    this.printing = false;
    this.showNotes = false;
  }
}
