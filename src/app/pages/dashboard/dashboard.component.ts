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
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCard, MatCardTitle, MatTableModule, MatCardModule, MatButtonModule, CommonModule, MatDialogModule, NgxChartsModule, SummaryProductCardComponent, RouterModule ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  latestTransactions = [
    { description: 'Transferência enviada', date: '2024-03-20', value: -900 },
    { description: 'Luz', date: '2024-04-13', value: -120 },
    { description: 'Energia', date: '2024-03-21', value: -200 },
    { description: 'Doceria Pão Doce', date: '2024-04-02', value: -80},
    { description: 'Depósito', date: '2024-04-01', value: 8000},
  ]
}
