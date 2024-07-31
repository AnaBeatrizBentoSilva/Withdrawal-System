import { Component } from '@angular/core';
import { CurrencyFormatDirective } from '../../directives/currencyFormat.directive';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrintingComponent } from '../../components/printing/printing.component';

@Component({
  selector: 'app-withdraw',
  standalone: true,
  imports: [
    CurrencyFormatDirective,
    FormsModule,
    CommonModule,
    PrintingComponent,
  ],
  templateUrl: './withdraw.component.html',
  styleUrl: './withdraw.component.scss',
})
export class WithdrawComponent {
  // Variables that control the state of the withdrawal component
  withdrawAmount: number = 0;
  errorMessage: string = '';
  noteCounts: { [key: number]: number } = {};
  printing: boolean = false;
  showNotes: boolean = false;

  // Method to obtain note keys in numeric format
  get noteKeys(): number[] {
    return Object.keys(this.noteCounts).map((key) => +key);
  }

  get totalNotes(): number {
    return Object.values(this.noteCounts).reduce((total, count) => total + count, 0);
  }

  // Method to process the withdrawal
  processWithdrawal() {
    const isValid = this.validateWithdrawal();
    if (!isValid) {
      return;
    }

    // Start loading state and hide notes while processing is in progress
    this.printing = true;
    this.showNotes = false;

    // Simulates a 2 second print
    setTimeout(() => {
      this.printing = false;
      this.showNotes = true;
    }, 2000);
  }

  // Method to validate the withdrawal amount
  validateWithdrawal(): boolean {
    this.errorMessage = '';
    this.noteCounts = {};

    //Requirements and restrictions variables
    const notes = [50, 20, 10];
    const minWithdrawal = 10;
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    let maxWithdrawal = 10000;

    // Adjusts maximum withdrawal during the night
    if (
      currentHour >= 22 ||
      currentHour < 6 ||
      (currentHour <= 6 && currentMinutes <= 0)
    ) {
      maxWithdrawal = 1000;
    }

    // Requirements and constraints validation checks
    if (this.withdrawAmount < minWithdrawal) {
      this.errorMessage = '*O valor de saque mínimo é de R$ 10.';
      return false;
    } else if (this.withdrawAmount % 10 !== 0) {
      this.errorMessage = '*O valor do saque deve ser múltiplo de 10.';
      return false;
    } else if (this.withdrawAmount > maxWithdrawal) {
      this.errorMessage = `*O valor de saque máximo é de R$ ${maxWithdrawal}.`;
      return false;
    } else {
      this.calculateNoteCounts(this.withdrawAmount, notes);
      return true;
    }
  }

  // Method to calculate the amount of each note needed for withdrawal
  calculateNoteCounts(amount: number, notes: number[]) {
    for (const note of notes) {
      const count = Math.floor(amount / note);
      if (count > 0) {
        this.noteCounts[note] = count;
        amount -= count * note;
      }
    }
  }

  // Method to get the note image path
  getImageForNote(note: number): string {
    const imagePaths: { [key: number]: string } = {
      50: '../../../assets/svg/fifty-note.svg',
      20: '../../../assets/svg/twenty-note.svg',
      10: '../../../assets/svg/ten-note.svg',
    };
    return imagePaths[note] || 'assets/images/default-note.png';
  }

  // Method to reset form values
  reset() {
    this.withdrawAmount = 0;
    this.errorMessage = '';
    this.noteCounts = {};
    this.printing = false;
    this.showNotes = false;
  }
}
