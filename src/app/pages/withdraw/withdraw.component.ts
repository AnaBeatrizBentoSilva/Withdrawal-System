import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrintingComponent } from '../../components/printing/printing.component';
import { NgxMaskDirective } from 'ngx-mask';

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
    const isValid = this.validateWithdrawal();
    if (!isValid) {
      return;
    }

    this.printing = true;
    this.showNotes = false;

    // Simula a impressão de 2 segundos
    setTimeout(() => {
      this.printing = false;
      this.showNotes = true;
    }, 2000);
  }

  // Método para validar o valor de saque
  validateWithdrawal(): boolean {
    this.errorMessage = '';
    this.noteCounts = {};

    const notes = [50, 20, 10];
    const minWithdrawal = 10;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    let maxWithdrawal = 10000;

    // Ajusta o saque máximo à noite
    if (
      currentHour >= 22 ||
      currentHour < 6 ||
      (currentHour <= 6 && currentMinutes <= 0)
    ) {
      maxWithdrawal = 1000;
    }

    const amount = this.withdrawAmountNumber;

    if (amount < minWithdrawal) {
      this.errorMessage = '*O valor de saque mínimo é de R$ 10.';
      return false;
    } else if (amount % 10 !== 0) {
      this.errorMessage = '*O valor do saque deve ser múltiplo de 10.';
      return false;
    } else if (amount > maxWithdrawal) {
      this.errorMessage = `*O valor de saque máximo é de R$ ${maxWithdrawal}.`;
      return false;
    } else {
      this.calculateNoteCounts(amount, notes);
      return true;
    }
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
