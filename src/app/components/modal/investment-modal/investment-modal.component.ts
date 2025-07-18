import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { InvestmentCardComponent } from '../../cards/investment-card/investment-card.component';


@Component({
  selector: 'app-investment-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule, InvestmentCardComponent],
  templateUrl: './investment-modal.component.html',
  styleUrl: './investment-modal.component.scss'
})
export class InvestmentModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: string }) {}
}
