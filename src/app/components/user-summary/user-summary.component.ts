import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-summary.component.html',
  styleUrl: './user-summary.component.scss'
})
export class UserSummaryComponent {
  userName: string = 'Ana Silva';
  saldo: number = 12500.75;

  showSaldo: boolean = false;
  toggleSaldo(): void {
    this.showSaldo = !this.showSaldo;
  }
}
