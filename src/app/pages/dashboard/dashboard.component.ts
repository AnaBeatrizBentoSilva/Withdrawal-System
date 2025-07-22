import { Component } from '@angular/core';
import { MatCard, MatCardTitle } from "@angular/material/card";
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatTableModule, MatCardModule, MatButtonModule, CommonModule, MatDialogModule, NgxChartsModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  latestTransactions = [
    { description: 'Transferência enviada', date: '2024-03-20', value: -5000 },
    { description: 'Luz', date: '2024-04-13', value: -10000 },
    { description: 'Energia', date: '2024-03-21', value: -5000 },
    { description: 'Doceria Pão Doce', date: '2024-04-02', value: -8000},
    { description: 'Depósito', date: '2024-04-01', value: 8000},
  ]

  chartData = [
    {
      name: 'Valor',
      series: this.latestTransactions.map(tx => ({
        name: new Date(tx.date).toLocaleDateString('pt-BR'),
        value: tx.value
      }))
    }
  ]

  view: [number, number] = [400, 350];
}
