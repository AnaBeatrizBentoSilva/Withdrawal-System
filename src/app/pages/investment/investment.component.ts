import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { InvestmentModalComponent } from '../../components/modal/investment-modal/investment-modal.component';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatDialogModule, CommonModule, InvestmentModalComponent],
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {
  totalInvested = 50000;

  recentInvestments = [
    { type: 'CDS', date: '2024-04-13', value: -10000 },
    { type: 'Fundo X', date: '2024-04-02', value: -8000},
    { type: 'LCI', date: '2024-03-20', value: -5000 },
  ]

  constructor(private dialog: MatDialog) {}

  openModal(type: string): void {
    this.dialog.open(InvestmentModalComponent, {
      data: { type },
      width: '700px'
    });
  }
}
