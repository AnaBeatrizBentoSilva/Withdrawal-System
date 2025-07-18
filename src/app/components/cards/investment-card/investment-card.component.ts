import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-investment-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './investment-card.component.html',
  styleUrl: './investment-card.component.scss'
})
export class InvestmentCardComponent {
  @Input() title = '';
  @Input() value = '';
  @Input() yield = '';
  @Input() dueDate = '';
}
